import { Component, OnInit, OnDestroy } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router'
import { SnippetService } from '../services/snippet/snippet.service'
import { Subscription } from 'rxjs/Subscription'
import { CodeEditorService } from '../services/code-editor/index'

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
    private codeEditorConfig: any

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService,
        private codeEditor: CodeEditorService) { }

    ngOnInit() {
        this.codeEditorConfig = this.codeEditor.config

        if (this.route.snapshot.params['id']) {
            this.editing = true
            this.routeDataObserver = this
                .route
                .data
                .subscribe((data: { snippet: Snippet }) => {
                    this.snippet = data[0]
                    this.snapshot = Object.assign({}, this.snippet)
                })
        } else {
            this.editing = false
            this.snippet = this.snippetService.mockOne()
        }
    }

    ngOnDestroy() {
        if (this.routeDataObserver) {
            this.routeDataObserver.unsubscribe()
        }
    }

    changeCodeBlockEditing(event: any) { }
}
