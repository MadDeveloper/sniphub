import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Snippet } from '../interfaces/snippet'
import { Code } from '../../code/interfaces/code'
import { Language } from '../../code/interfaces/language'
import { SnippetService } from '../services/snippet.service'
import { CodeService } from '../../code/services/code.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { config } from '../../../config'

@Component({
    selector: 'app-edit-snippet',
    templateUrl: './edit-snippet.component.html',
    styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit, OnDestroy {
    private snippet: Snippet
    private snapshot: Snippet
    private codeBlocks: any[]
    private editing: boolean
    private codes: Code[]
    private codesObserver: Subscription
    private codesLoaded = false
    private code: Code
    private languages: Language[]
    private loaded = false
    private nameMaxLength = config.snippet.maxLengthName
    private saving = false
    private error: any

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService,
        private codeService: CodeService,
        private router: Router,
        private authentication: AuthenticationService) { }

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
            const author = this.authentication.currentUser()

            this.saving = true

            if (this.editing) {
                await this.snippetService.update(this.snippet)
                await this.codeService.updateAll(this.codes, this.snippet, author)
            } else {
                this.snippet.id = (await this.snippetService.create(this.snippet, author)).key
                await this.codeService.createAll(this.codes, this.snippet, author)
            }

            this.router.navigate([`/snippets/${this.snippet.id}`])
        } catch (error) {
            this.error = error
        }
    }
}
