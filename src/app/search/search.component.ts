import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
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
    @Input()
    terms: string = null
    snippets: Observable<Snippet[]>
    termsObserver: Subscription

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService,
        private searchService: SearchService) { }

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
                if (this.terms !== terms) {
                    this.search()
                }
        })
    }

    search() {
        this.snippets = this.searchService.searchByAll(this.terms)
    }
}
