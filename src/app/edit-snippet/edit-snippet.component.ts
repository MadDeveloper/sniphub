import { Component, OnInit } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router'
import { SnippetService } from '../services/snippet/snippet.service'

@Component({
    selector: 'app-edit-snippet',
    templateUrl: './edit-snippet.component.html',
    styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit {
    private snippet: Snippet
    private snapshot: Snippet
    private codeBlocks: Array<any>
    private editing: boolean

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService) { }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.editing = true
            this.route
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
}
