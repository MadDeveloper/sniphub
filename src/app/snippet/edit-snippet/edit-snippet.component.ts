import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Snippet } from '../interfaces/snippet'
import { Code } from '../../code/interfaces/code'
import { Language } from '../../code/interfaces/language'
import { SnippetService } from '../services/snippet.service'
import { CodeService } from '../../code/services/code.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { config } from '../../../config'
import { LanguageService } from '../../code/services/language.service'
import { languages } from '../../code/services/languages'
import { MetaService } from '@ngx-meta/core'

@Component({
    selector: 'app-edit-snippet',
    templateUrl: './edit-snippet.component.html',
    styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit, OnDestroy {
    snippet: Snippet
    snapshot: Snippet
    codeBlocks: any[]
    editing: boolean
    codes: Code[] = []
    newCodes: Code[] = []
    codesObserver: Subscription
    codesLoaded = false
    code: Code
    languages: Language[]
    loaded = false
    minLengthName = config.snippet.minLengthName
    maxLengthName = config.snippet.maxLengthName
    saving = false
    errors = {
        name: null,
        code: null,
        global: null
    }
    @ViewChild('errorName') errorName: ElementRef
    @ViewChild('errorCode') errorCode: ElementRef

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService,
        private codeService: CodeService,
        private router: Router,
        private authentication: AuthenticationService,
        private language: LanguageService,
        private readonly meta: MetaService) { }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.editing = true
            this.route
                .data
                .subscribe(async (data: { snippet: Snippet }) => {
                    this.snippet = data[0]
                    this.snapshot = Object.assign({}, this.snippet)
                    this.loadCodes()
                    this.changeMeta()
                })
        } else {
            this.editing = false
            this.snippet = this.snippetService.mockOne()
            this.codes = [this.codeService.mockOne()]
            this.loaded = true
            this.changeMeta()
        }
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        if (this.codesObserver) {
            this.codesObserver.unsubscribe()
        }
    }

    changeMeta() {
        let title = ''

        if (this.editing) {
            title = `Editing - ${this.snippet.name}`
        } else {
            title = 'Creating new snippet'
        }

        this.meta.setTitle(title, true)
    }

    extractLanguages(): Language[] {
        return this.codes.map(code => code.language)
    }

    loadCodes() {
        this.codesObserver = this
            .codeService
            .all(this.snippet)
            .subscribe((codes: Code[]) => {
                this.codes = codes
                this.codesLoaded = true
                this.loaded = true
            })
    }

    async save() {
        try {
            if (await this.verify()) {
                const author = this.authentication.currentUser()
                const codes = this.codeService.filterEmptyCodes(this.codes).concat(this.codeService.filterEmptyCodes(this.newCodes))

                this.saving = true
                this.snippet.codesCounter = codes.length

                if (this.editing) {
                    await this.snippetService.update(this.snippet)
                } else {
                    this.snippet.id = (await this.snippetService.create(this.snippet, author)).id
                }

                await this.codeService.saveAll(codes, this.snippet, author)

                this.router.navigate([`/snippets/${this.snippet.id}`])
            }
        } catch (error) {
            this.errors.global = error
        }
    }

    async verify() {
        if (!this.snippet.name || this.snippet.name.length < this.minLengthName) {
            this.errors.name = `The snippet name cannot has less than ${this.minLengthName} characters`
            this.scrollTo(this.errorName.nativeElement)

            return false
        }

        if (this.snippet.name.length > this.maxLengthName) {
            this.errors.name = `The snippet name cannot exceeds ${this.maxLengthName} characters`
            this.scrollTo(this.errorName.nativeElement)

            return false
        }

        if (this.snapshot && this.snapshot.name !== this.snippet.name) {
            const snippetsFound = await this.snippetService.findByName(this.snippet.name).first().toPromise()

            if (snippetsFound.length > 0) {
                this.errors.name = `The snippet name already exists`
                this.scrollTo(this.errorName.nativeElement)

                return false
            }
        }

        this.errors.name = null

        const codes = this.codeService.filterEmptyCodes(this.codes).concat(this.codeService.filterEmptyCodes(this.newCodes))

        if (codes.length === 0) {
            this.errors.code = `At least one complete code has to be added`
            this.scrollTo(this.errorCode.nativeElement)

            return false
        }

        const dupliactedLanguages = this.detectDuplicatedLanguagesCodes(codes)

        if (dupliactedLanguages.length > 0) {
            this.errors.code = `You have duplicated languages in your codes: ${dupliactedLanguages.join(', ')}`
            this.scrollTo(this.errorCode.nativeElement)

            return false
        }

        this.errors.code = null

        return true
    }

    detectDuplicatedLanguagesCodes(codes: Code[]) {
        const languagesFound = {}
        const languagesDuplicated = []

        codes.forEach(code => {
            const language = code.language.text

            if (!languagesFound[language]) {
                languagesFound[language] = true
            } else {
                languagesDuplicated.push(language)
            }
        })

        return languagesDuplicated
    }

    scrollTo(htmlElement: HTMLElement) {
        window.scrollTo(0, htmlElement.offsetTop)
    }
}
