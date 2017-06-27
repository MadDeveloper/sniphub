import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Snippet } from '../interfaces/snippet'
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../core/services/user/user.service'
import { LikeService } from './like.service'

@Injectable()
export class SnippetService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService,
        private like: LikeService) { }

    all(options?: any): Observable<Snippet[]> {
        return this.database
            .list(this.snippetsPath(), options)
            .map((snippets: any[]) => snippets.map((snippetFetched: any): Snippet => {
                const snippet: Snippet = {
                    id: snippetFetched.$key,
                    name: snippetFetched.name,
                    author: this.user.find(snippetFetched.author),
                    description: snippetFetched.description,
                    date: new Date(snippetFetched.date),
                    codes: null,
                    likes: null
                }

                snippet.likes = this.like.all(snippet)

                return snippet
            }))
    }

    find(name: string, options?: any): Observable<Snippet> {
        return this.database.object(`/${name}`, options)
    }

    save(snippet: Snippet) {
        return this.database.object(this.snippetPath(snippet))
    }

    delete(snippet: Snippet) {
        return this.database.object(this.snippetPath(snippet)).remove()
    }

    mockOne(): Snippet {
        return {
            id: null,
            name: 'null',
            description: null,
            date: null,
            author: null,
            codes: null
        }
    }

    private snippetsPath() {
        return '/snippets'
    }

    private snippetPath(snippet: Snippet) {
        return `${this.snippetsPath()}/${snippet.name}`
    }
}
