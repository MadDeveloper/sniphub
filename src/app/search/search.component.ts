import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core'
import { SnippetService } from '../services/snippet/snippet.service'
import { Snippet } from '../interfaces/snippet/index'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, OnChanges {
    private snippets: Snippet[]
    private routeParamsObserver: Subscription
    @Input()
    private searchTerms: string

    constructor(
        private route: ActivatedRoute,
        private snippetService: SnippetService) { }

    ngOnInit() {
        this.routeParamsObserver = this
            .route
            .params
            .subscribe((data: any) => {
                // console.log(data)
            })
        this.snippets = []
        this.snippetService
            .all()
            .then( snippets => this.snippets = snippets )
    }

    ngOnChanges(changes: SimpleChanges) {
        this.searchTerms = changes.searchTerms.currentValue
    }

    ngOnDestroy() {
        this.routeParamsObserver.unsubscribe()
    }
}
