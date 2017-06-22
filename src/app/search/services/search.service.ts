import { Injectable } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { SnippetService } from '../../services/snippet/snippet.service'

@Injectable()
export class SearchService {
    constructor(private snippet: SnippetService) { }

    async searchByAll(terms: string): Promise<Snippet[]> {
        const snippets = await this.snippet.all()

        terms = terms.toLowerCase()

        return Promise.resolve(
            snippets.filter(snippet => snippet.name.toLowerCase().includes(terms) || snippet.description.toLowerCase().includes(terms))
        )
    }

    async searchByName(terms: string): Promise<Snippet[]> {
        const snippets = await this.snippet.all()

        return Promise.resolve(
            snippets.filter(snippet => snippet.name.includes(terms))
        )
    }
}
