import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core'
import { SnippetService } from '../services/snippet/snippet.service'
import { Snippet } from '../interfaces/snippet/index'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { SearchService } from './services/search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, OnChanges {
    private snippets: Snippet[]
    private routeParamsObserver: Subscription
    @Input()
    private terms: string

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService,
        private searchService: SearchService) { }

    async ngOnInit() {
        this.routeParamsObserver = this
            .route
            .params
            .subscribe((data: { terms: string }) => {
                if (data.terms) {
                    this.terms = data.terms

                    if (this.terms.length > 0) {
                        this.search()
                    }
                }
            })
        this.snippets = []
        this.snippets = await this.snippetService.all()
    }

    ngOnChanges(changes: SimpleChanges) {
        this.terms = changes.terms.currentValue

        if (this.terms.length > 0) {
            this.search()
        }
    }

    ngOnDestroy() {
        this.routeParamsObserver.unsubscribe()
    }

    async search() {
        this.snippets = await this.searchService.searchByAll(this.terms)
    }
}
