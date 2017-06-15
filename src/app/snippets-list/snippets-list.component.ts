import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Snippet } from 'app/interfaces/snippet'

@Component({
  selector: 'app-snippets-list',
  templateUrl: './snippets-list.component.html',
  styleUrls: ['./snippets-list.component.scss']
})
export class SnippetsListComponent implements OnInit {
    static nameMaxLength = 65

    @Input()
    private snippets: Snippet[]

    constructor(private router: Router) { }

    ngOnInit() { }

    snippetDetails(snippet: Snippet) {
        this.router.navigate([`snippet/${snippet.id}`])
    }

    truncateName(name: string) {
        if (name.length > SnippetsListComponent.nameMaxLength) {
            return `${name.substring(0, SnippetsListComponent.nameMaxLength - 3)}...`
        }

        return name
    }
}
