import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Snippet } from '../interfaces/snippet'
import { Observable } from 'rxjs/Observable'
import { LikeService } from '../services/like.service'
import { Like } from '../interfaces/like'
import { config } from '../../../config'

@Component({
  selector: 'app-snippets-list',
  templateUrl: './snippets-list.component.html',
  styleUrls: ['./snippets-list.component.scss']
})
export class SnippetsListComponent {
    static nameMaxLength = config.snippet.maxLengthName

    @Input()
    snippets: Snippet[]

    constructor(
        private router: Router,
        private like: LikeService) { }

    snippetDetails(snippet: Snippet) {
        this.router.navigate([`snippets/${snippet.id}`])
    }

    truncateName(name: string) {
        if (name.length > SnippetsListComponent.nameMaxLength) {
            return `${name.substring(0, SnippetsListComponent.nameMaxLength - 3)}...`
        }

        return name
    }
}
