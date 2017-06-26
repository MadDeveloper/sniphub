import { Injectable } from '@angular/core'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SearchService {
    constructor(private snippet: SnippetService) { }

    searchByAll(terms: string): Observable<Snippet[]> {
        // const snippets = await this.snippet.all()

        // terms = terms.toLowerCase()

        // return Promise.resolve(
        //     snippets.filter(snippet => snippet.name.toLowerCase().includes(terms) || snippet.description.toLowerCase().includes(terms))
        // )
        return null
    }

    async searchByName(terms: string): Promise<Snippet[]> {
        // const snippets = this.snippet.all()

        // return Promise.resolve(
        //     snippets.filter(snippet => snippet.name.includes(terms))
        // )
        return Promise.resolve([])
    }
}
