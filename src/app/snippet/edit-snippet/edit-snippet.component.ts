import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Snippet } from '../interfaces/snippet'
import { Code } from '../../code/interfaces/code'
import { Language } from '../../code/interfaces/language'
import { SnippetService } from '../services/snippet.service'
import { CodeService } from '../../code/services/code.service'

@Component({
    selector: 'app-edit-snippet',
    templateUrl: './edit-snippet.component.html',
    styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit, OnDestroy {
    private routeDataObserver: Subscription
    private snippet: Snippet
    private snapshot: Snippet
    private codeBlocks: any[]
    private editing: boolean
    private codes: Code[]
    private code: Code
    private languages: Language[]
    private loaded = false
    private nameMaxLength = 70

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService,
        private codeService: CodeService) { }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.editing = true
            this.routeDataObserver = this
                .route
                .data
                .subscribe(async (data: { snippet: Snippet }) => {
                    this.snippet = data[0]
                    this.snapshot = Object.assign({}, this.snippet)
                    this.codes = await this.codeService.all(this.snippet)

                    if (this.codes.length > 0) {
                        this.languages = this.extractLanguages()
                    }

                    this.loaded = true
                })
        } else {
            this.editing = false
            this.snippet = this.snippetService.mockOne()
            this.loaded = true
        }
    }

    ngOnDestroy() {
        if (this.routeDataObserver) {
            this.routeDataObserver.unsubscribe()
        }
    }

    extractLanguages(): Language[] {
        return this.codes.map(code => code.language)
    }

    codeBlockChange(event: any) {

    }

    save() {
        this.snippetService.save(this.snippet)
    }
}
