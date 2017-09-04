import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core'
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
    page = 0
    loading = false
    loadingNextPage = false
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
        if (!this.page) {
            this.loading = true
        } else {
            this.loadingNextPage = true
        }

        const response = await this.searchService.search(this.terms, this.page)

        if (!this.page) {
            this.snippets = response
        } else {
            this.snippets.push(...response)
        }

        this.total = this.searchService.lastSearchResultsTotal

        if (!this.page) {
            this.loading = false
        } else {
            this.loadingNextPage = false
        }
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const html = document.documentElement
        const body = document.body
        const userScroll = window.innerHeight + (document.documentElement.scrollTop || body.scrollTop)
        const maxScroll = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )

        if (userScroll >= maxScroll && !this.loadingNextPage) {
            // load the rest of the response
            this.page++
            this.search()
        }
    }
}
