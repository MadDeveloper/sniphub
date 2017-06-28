import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Snippet } from '../interfaces/snippet'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserService } from '../../core/services/user/user.service'
import { LikeService } from './like.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SnippetService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService,
        private like: LikeService) { }

    all(options?: any): Observable<Snippet[]> {
        return this.database
            .list(this.snippetsPath(), options)
            .map((snippets: any[]) => snippets.map((snippetFetched: any): Snippet => this.buildOne(snippetFetched)))
    }

    find(id: string): Observable<Snippet> {
        return this
            .database
            .object(this.snippetPath(id))
            .map(snippetFetched => {
                let snippet: Snippet = null

                if (snippetFetched.$exists()) {
                    snippet = this.buildOne(snippetFetched)
                }

                return snippet
            })
    }

    findAsSnapshot(id: string): Observable<Snippet> {
        return this
            .database
            .object(this.snippetPath(id), { preserveSnapshot: true })
            .map(snapshot => {
                let snippet: Snippet = null

                if (snapshot.exists()) {
                    snippet = this.buildOneFromSnapshot(snapshot)
                }

                return snippet
            })
    }

    save(snippet: Snippet) {
        return this.database.object(this.snippetPath(snippet.id))
    }

    delete(snippet: Snippet) {
        return this.database.object(this.snippetPath(snippet.id)).remove()
    }

    mockOne(): Snippet {
        return {
            id: null,
            name: 'null',
            description: null,
            date: null,
            author: null,
            codes: null,
            likes: null
        }
    }

    private buildOne(snippetFetched): Snippet {
        const snippet: Snippet = {
            id: snippetFetched.$key,
            name: snippetFetched.name,
            author: this.user.find(snippetFetched.author),
            description: snippetFetched.description,
            date: snippetFetched.date,
            codes: null,
            likes: null
        }

        snippet.likes = this.like.all(snippet)

        return snippet
    }

    private buildOneFromSnapshot(snapshot): Snippet {
        const id = snapshot.key
        const snippetFetched = snapshot.val()

        snippetFetched.$key = id

        return this.buildOne(snippetFetched)
    }

    private snippetsPath() {
        return '/snippets'
    }

    private snippetPath(id: string) {
        return `${this.snippetsPath()}/${id}`
    }
}
