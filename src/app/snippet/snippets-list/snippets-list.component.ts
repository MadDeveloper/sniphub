import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { Snippet } from '../interfaces/snippet'
import { config } from '../../../config'

@Component({
  selector: 'app-snippets-list',
  templateUrl: './snippets-list.component.html',
  styleUrls: ['./snippets-list.component.scss']
})
export class SnippetsListComponent {
    @Input()
    snippets: Snippet[]

    constructor(private router: Router) { }

    snippetDetails(snippet: Snippet) {
        this.router.navigate([`snippets/${snippet.id}`])
    }

    truncateName(name: string) {
        if (name.length > config.snippet.maxLengthName) {
            return `${name.substring(0, config.snippet.maxLengthName - 3)}...`
        }

        return name
    }

    truncateDescription(description: string) {
        if (description.length > config.snippet.maxLengthDescription) {
            return `${description.substring(0, config.snippet.maxLengthDescription - 3)}...`
        }

        return description
    }
}
