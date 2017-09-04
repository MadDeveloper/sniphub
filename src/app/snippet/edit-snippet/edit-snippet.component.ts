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
    codes: Code[]
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
        private language: LanguageService) { }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.editing = true
            this.route
                .data
                .subscribe(async (data: { snippet: Snippet }) => {
                    this.snippet = data[0]
                    this.snapshot = Object.assign({}, this.snippet)
                    this.loadCodes()
                })
        } else {
            this.editing = false
            this.snippet = this.snippetService.mockOne()
            this.codes = [this.codeService.mockOne()]
            this.loaded = true
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
            if (this.verify()) {
                const author = this.authentication.currentUser()
                const codes = this.codeService.filterEmptyCodes(this.codes)

                this.saving = true
                this.snippet.codesCounter = codes.length

                if (this.editing) {
                    await this.snippetService.update(this.snippet)
                } else {
                    this.snippet.id = (await this.snippetService.create(this.snippet, author)).key
                }

                await this.codeService.saveAll(codes, this.snippet, author)

                this.router.navigate([`/snippets/${this.snippet.id}`])
            }
        } catch (error) {
            this.errors.global = error
        }
    }

    verify() {
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

        this.errors.name = null

        if (this.codeService.filterEmptyCodes(this.codes).length === 0) {
            this.errors.code = `At least one complete code has to be added`
            this.scrollTo(this.errorCode.nativeElement)

            return false
        }

        this.errors.code = null

        return true
    }

    scrollTo(htmlElement: HTMLElement) {
        window.scrollTo(0, htmlElement.offsetTop)
    }
}