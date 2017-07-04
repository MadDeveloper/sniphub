import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Snippet } from '../interfaces/snippet'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserService } from '../../core/services/user/user.service'
import { LikeService } from './like.service'
import { Observable } from 'rxjs/Observable'
import { DatabaseHelperService } from '../../core/services/database-helper/database-helper.service'

@Injectable()
export class SnippetService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService,
        private like: LikeService,
        private databaseHelper: DatabaseHelperService) { }

    all(options?: any): Observable<Snippet[]> {
        const snippetsList = this.database.list(this.snippetsPath(), options)

        return this
            .databaseHelper
            .filterListOmittedKeys(snippetsList)
            .map((snippets: any[]) => snippets.map((snippet: any): Snippet => this.forge(snippet)))
    }

    find(id: string): Observable<Snippet> {
        return this
            .database
            .object(this.snippetPath(id))
            .map(snippetFetched => {
                let snippet: Snippet = null

                if (snippetFetched.$exists()) {
                    snippet = this.forge(snippetFetched)
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
                    snippet = this.forgeFromSnapshot(snapshot)
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
            name: null,
            description: null,
            date: null,
            author: null,
            codes: null,
            likes: null
        }
    }

    private forge(snippetFetched): Snippet {
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

    private forgeFromSnapshot(snapshot): Snippet {
        const id = snapshot.key
        const snippetFetched = snapshot.val()

        snippetFetched.$key = id

        return this.forge(snippetFetched)
    }

    private snippetsPath() {
        return '/snippets'
    }

    private snippetPath(id: string) {
        return `${this.snippetsPath()}/${id}`
    }
}
