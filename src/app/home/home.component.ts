import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import * as $ from 'jquery'
import { Router } from '@angular/router'
import { Snippet } from '../snippet/interfaces/snippet'
import { SnippetService } from '../snippet/services/snippet.service'
import { AuthenticationService } from '../authentication/services/authentication.service'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    snippets: Snippet[] = []
    searching = false
    @ViewChild('searchInput')
    searchInput: ElementRef
    searchTerms = ''
    searchEnabled = false
    loading = false
    snippetsObserver: Subscription

    constructor(
        private router: Router,
        private snippetService: SnippetService,
        private authentication: AuthenticationService) { }

    ngOnInit() {
        this.loadSnippets()
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        if (this.snippetsObserver) {
            this.snippetsObserver.unsubscribe()
        }
    }

    loadSnippets() {
        this.enableLoading()
        this.snippetsObserver = this
            .snippetService
            .all()
            .subscribe((snippets: Snippet[]) => {
                this.snippets = snippets
                this.disableLoading()
            })
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

    enableLoading() {
        this.loading = true
    }

    disableLoading() {
        this.loading = false
    }
}
