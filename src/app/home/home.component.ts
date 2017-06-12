import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import * as $ from 'jquery'
import { Router } from '@angular/router'
import { SnippetService } from 'app/services/snippet/snippet.service'
import { Snippet } from 'app/interfaces/snippet'
import { AuthenticationService } from 'app/services/authentication/authentication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private snippets: Snippet[]
    private searching: boolean
    @ViewChild('searchInput')
    private searchInput: ElementRef
    private searchTerms: string
    private searchEnabled: boolean

    constructor(
        private router: Router,
        private snippetService: SnippetService,
        private authentication: AuthenticationService) { }

    async ngOnInit() {
        this.searchEnabled = false
        this.searchTerms = ''
        this.snippets = []
        this.snippets = await this.snippetService.all()
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
