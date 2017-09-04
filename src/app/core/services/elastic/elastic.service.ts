import { Client } from 'elasticsearch'
import { config } from '../../../../config'
import { Injectable } from '@angular/core'
import { PaginableResponse } from '../../interfaces/response/paginable-response'

@Injectable()
export class ElasticService {
    client = new Client({
        host: config.elastic.url
    })

    async search(terms: string, page = 1) {
        try {
            return await this.client.search({
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
                    size: config.elastic.sizePerResults,
                    from: (page - 1) * config.elastic.sizePerResults
                }
            })
        } catch (error) {
            console.error(`An error occured when searching terms ${terms} with elastic.\n${error}`)
        }
    }
}
