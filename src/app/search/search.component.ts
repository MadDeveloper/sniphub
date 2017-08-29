import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { SearchService } from './services/search.service'
import { Snippet } from '../snippet/interfaces/snippet'
import { SnippetService } from '../snippet/services/snippet.service'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    terms: string = null
    snippets: Snippet[] = []
    total = 0
    loading = false
    termsObserver: Subscription

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService,
        private searchService: SearchService,
        private router: Router) { }

    ngOnInit() {
        this.observeTerms()
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        this.termsObserver.unsubscribe()
    }

    observeTerms() {
        this.termsObserver = this.searchService
            .terms$
            .subscribe(terms => {
                if (!terms) {
                    this.router.navigateByUrl('/')
                } else if (this.searchService.lastSearchResultsTerms === terms) {
                    this.terms = terms
                    this.snippets = this.searchService.lastSearchResults
                } else {
                    if (this.terms !== terms) {
                        this.terms = terms
                        this.search()
                    }
                }
            })
    }

    async search() {
        this.loading = true
        this.snippets = await this.searchService.search(this.terms)
        this.total = this.searchService.lastSearchResultsTotal
        this.loading = false
    }
}
