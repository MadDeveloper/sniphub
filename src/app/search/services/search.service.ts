import { Injectable } from '@angular/core'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { ElasticService } from '../../core/services/elastic/elastic.service'

@Injectable()
export class SearchService {
    lastSearchResultsTotal: number
    lastSearchResults: Snippet[]
    lastSearchResultsTerms: string
    terms$: BehaviorSubject<string> = new BehaviorSubject(null)

    constructor(
        private snippet: SnippetService,
        private elastic: ElasticService) { }

    changeTerms(terms: string) {
        this.terms$.next(terms)
    }

    async search(terms: string): Promise<Snippet[]> {
        try {
            const response = await this.elastic.search(terms)

            console.log(response)

            this.lastSearchResultsTerms = terms
            this.lastSearchResults = this.parse(response)
            this.lastSearchResultsTotal = response.hits.total

            return this.lastSearchResults
        } catch (error) {
            console.error(`Error when searching with search service.\n${error}`)
        }
    }

    private parse(response: Elasticsearch.SearchResponse<any>): Snippet[] {
        if (response.hits.total <= 0) {
            return []
        }

        return response.hits.hits.map(snippetElastic => this.snippet.forgeFromElastic(snippetElastic))
    }
}
