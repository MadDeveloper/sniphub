import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Snippet } from '../interfaces/snippet'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserService } from '../../core/services/user/user.service'
import { LikeService } from './like.service'
import { Observable } from 'rxjs/Observable'
import { User } from '../../core/interfaces/user/user'
import * as firebase from 'firebase'
import { CodeService } from '../../code/services/code.service'

@Injectable()
export class SnippetService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService,
        private like: LikeService,
        private code: CodeService) { }

    all(options?: any): Observable<Snippet[]> {
        return this
            .allFromDatabase(options)
            .map((snippets: any[]) => this.forgeAll(snippets))
    }

    lastAdded(): Observable<Snippet[]> {
        return this
            .allFromDatabase({
                query: {
                    orderByChild: 'date'
                }
            })
            .map((snippets: any[]) => this.forgeAll(snippets).reverse())
    }

    popular() {
        return this
            .allFromDatabase()
            .map((snippets: any[]) => this.forgeAll(snippets))
            .map((snippets: Snippet[]) => snippets.sort((snippetA: Snippet, snippetB: Snippet): number => {
                if (snippetA.date > snippetB.date) {
                    return 1
                } else if (snippetA.date < snippetB.date) {
                    return -1
                }

                return 0
            }))
    }

    author(author: User): Observable<Snippet[]> {
        return this
            .allFromDatabase({
                query: {
                    orderByChild: 'author',
                    equalTo: author.id
                }
            })
            .map((snippets: any[]): Snippet[] => this.forgeAll(snippets))
    }

    contributor(author: User): Observable<Snippet[]> {
        return this
            .allFromDatabase({
                query: {
                    orderByChild: 'author',
                    equalTo: author.id
                }
            })
            .map((snippets: any[]): Snippet[] => this.forgeAll(snippets))
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

    create(snippet: Snippet, author: User) {
        return this
            .allFromDatabase()
            .push({
                name: snippet.name,
                author: author.id,
                description: snippet.description,
                date: firebase.database.ServerValue.TIMESTAMP
            })
    }

    update(snippet: Snippet) {
        return this
            .database
            .object(this.snippetPath(snippet.id))
            .update({
                description: snippet.description,
                name: snippet.name
            })
    }

    delete(snippet: Snippet) {
        return this
            .database
            .object(this.snippetPath(snippet.id))
            .remove()
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

    forgeAll(snippets: any[]) {
        return snippets.map((snippet: any): Snippet => this.forge(snippet))
    }

    forge(snippetFetched): Snippet {
        const snippet: Snippet = {
            id: snippetFetched.$key,
            name: snippetFetched.name,
            author: this.user.find(snippetFetched.author),
            description: snippetFetched.description,
            date: snippetFetched.date,
            codes: null,
            likes: null
        }

        snippet.codes = this.code.all(snippet)
        snippet.likes = this.like.all(snippet)

        return snippet
    }

    private allFromDatabase(options?: any) {
        return this.database.list(this.snippetsPath(), options)
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
