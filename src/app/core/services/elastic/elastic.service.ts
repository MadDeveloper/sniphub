import { Client } from 'elasticsearch'
import { Injectable } from '@angular/core'
import { PaginableResponse } from '../../interfaces/response/paginable-response'
import { environment } from 'environments/environment'

@Injectable()
export class ElasticService {
    client = new Client({
        host: environment.elastic.url
    })

    search(terms: string, page = 1) {
        const sizePerResults = environment.elastic.sizePerResults

        return this.client.search({
            index: 'firebase',
            body: {
                query: {
                    query_string: {
                        fields: ['name', 'description'],
                        query: `*${terms}*`,
                        analyze_wildcard: true,
                        split_on_whitespace: true
                    }
                },
                size: sizePerResults,
                from: (page - 1) * sizePerResults
            }
        })
    }
}
