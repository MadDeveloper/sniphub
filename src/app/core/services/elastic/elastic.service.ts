import { Injectable } from '@angular/core'
import { Client } from 'elasticsearch'
import { config } from '../../../../config'

@Injectable()
export class ElasticService {
    client: Client

    constructor() {
        this.client = new Client({
            host: config.elastic.url
        })
    }

    async search(terms: string, page = 0) {
        console.log(page)
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
                    from: page * config.elastic.sizePerResults
                }
            })
        } catch (error) {
            console.error(`An error occured when searching terms ${terms} with elastic.\n${error}`)
        }
    }
}
