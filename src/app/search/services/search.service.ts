import { Injectable } from '@angular/core'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { ElasticService } from '../../core/services/elastic/elastic.service'
import { PaginableResponse } from '../../core/interfaces/response/elastic/paginable-response'
import { config } from '../../../config'

@Injectable()
export class SearchService {
    terms$: BehaviorSubject<string> = new BehaviorSubject(null)

    constructor(
        private snippet: SnippetService,
        private elastic: ElasticService) { }

    changeTerms(terms: string) {
        this.terms$.next(terms)
    }

    async search(terms: string, page = 0): Promise<PaginableResponse<Snippet[]>> {
        try {
            const responseElastic = await this.elastic.search(terms, page)
            const snippets = this.parse(responseElastic)
            const response = {
                hits: snippets,
                raw: Object.assign({}, responseElastic),
                total: responseElastic.hits.total,
                next: () => this.search(terms, ++page),
                canNext: this.calculateCanNext(responseElastic, page)
            }

            return response
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

    private calculateCanNext(response: Elasticsearch.SearchResponse<any>, page: number): boolean {
        const indexLastItem = (page * config.elastic.sizePerResults) + config.elastic.sizePerResults

        return indexLastItem < response.hits.total
    }
}
