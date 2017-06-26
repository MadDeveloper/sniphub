import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as $ from 'jquery'
import { Router } from '@angular/router'
import { Snippet } from '../snippet/interfaces/snippet'
import { SnippetService } from '../snippet/services/snippet.service'
import { AuthenticationService } from '../authentication/services/authentication.service'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private snippets: Observable<Snippet[]>
    private searching: boolean
    @ViewChild('searchInput')
    private searchInput: ElementRef
    private searchTerms: string
    private searchEnabled: boolean

    constructor(
        private router: Router,
        private snippetService: SnippetService,
        private authentication: AuthenticationService) { }

    ngOnInit() {
        this.searchEnabled = false
        this.searchTerms = ''
        this.snippets = this.snippetService.all()
        this.searching = false
    }

    focusSearchInput(event: Event) {
        this.searchInput.nativeElement.focus()
    }

    search(terms: string) {
        this.searching = terms.length > 0
        this.searchTerms = terms
    }

    toggleSearch() {
        if (this.searchInput.nativeElement.value.length === 0) {
            this.searchEnabled = !this.searchEnabled
        }
    }
}
