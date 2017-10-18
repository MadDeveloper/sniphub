import * as firebase from 'firebase'
import { AngularFireDatabase } from 'angularfire2/database'
import { CodeService } from '../../code/services/code.service'
import { config } from '../../../config'
import { Injectable } from '@angular/core'
import { LikeService } from './like.service'
import { Observable } from 'rxjs/Observable'
import { Snippet } from '../interfaces/snippet'
import { User } from '../../core/interfaces/user/user'
import { UserService } from '../../core/services/user/user.service'

@Injectable()
export class SnippetService {
    cache = {
        latestAdded: null,
        popular: null,
        popularCacheEndValid: null,
        latestAddedCacheEndValid: null
    }

    constructor(
        private database: AngularFireDatabase,
        private user: UserService,
        private like: LikeService,
        private code: CodeService) { }

    latestAdded(): Observable<Snippet[]> {
        if (this.cache.latestAdded && this.cache.latestAddedCacheEndValid >= Date.now()) {
            return Observable.of(this.cache.latestAdded)
        }

        return this
            .allFromDatabase({
                query: {
                    orderByChild: 'date',
                    limitToLast: config.snippet.maxLatestAddedDisplayed
                }
            })
            .map((snippets: any[]) => this.forgeAll(snippets).reverse())
            .do(snippets => {
                this.cache.latestAdded = snippets
                this.cache.latestAddedCacheEndValid = Date.now() + config.snippet.latestAddedCacheDuration
            })
    }

    popular() {
        if (this.cache.popular && this.cache.popularCacheEndValid >= Date.now()) {
            return Observable.of(this.cache.popular)
        }

        return this
            .allFromDatabase({
                query: {
                    orderByChild: 'likesCounter',
                    limitToLast: config.snippet.maxPopularDisplayed
                }
            })
            .map((snippets: any[]) => this.forgeAll(snippets))
            .map((snippets: Snippet[]) => snippets.sort((snippetA: Snippet, snippetB: Snippet): number => {
                if (snippetA.date > snippetB.date) {
                    return 1
                } else if (snippetA.date < snippetB.date) {
                    return -1
                }

                return 0
            }))
            .do(snippets => {
                this.cache.popular = snippets
                this.cache.popularCacheEndValid = Date.now() + config.snippet.popularCacheDuration
            })
    }

    author(author: User): Observable<Snippet[]> {
        return this
            .database
            .list(this.snippetsByUidPath(author))
            .switchMap((snippetsFirebase: any[]): Observable<Snippet[]> => {
                const snippets = snippetsFirebase.map(badge => badge.$key)

                if (0 === snippets.length) {
                    return Observable.of([])
                }

                const snippets$ = Observable
                    .combineLatest(...snippets
                        .map((snippetId: string): Observable<Snippet> => this
                            .database
                            .object(this.snippetPath(snippetId))
                            .map((snippetFirebase: any): Snippet => this.forge(snippetFirebase))))

                return snippets$
            })
    }

    contributor(author: User): Observable<Snippet[]> {
        return this
            .allContributionsFromDatabase(author)
            .map((contributions: any[]) => {
                if (contributions.length > 0) {
                    return Observable.zip(...contributions.map(contribution => this.find(contribution.$key)))
                }

                return Observable.of([])
            })
            .mergeAll()
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

    findByName(name: string): Observable<Snippet[]> {
        return this
            .database
            .list(this.snippetsPath(), {
                query: {
                    orderByChild: 'name',
                    equalTo: name
                }
            })
            .map(snippets => this.forgeAll(snippets))
    }

    create(snippet: Snippet, author: User): firebase.Promise<Snippet> {
        const snippetId = this.allFromDatabase().$ref.ref.push().key

        return this
            .allFromDatabase()
            .update(snippetId, {
                name: snippet.name,
                author: author.id,
                description: snippet.description,
                date: firebase.database.ServerValue.TIMESTAMP,
                likesCounter: snippet.likesCounter || 0,
                codesCounter: snippet.codesCounter || 0
            })
            .then(() => this.database
                .object(this.snippetsByUidPath(author))
                .update({
                    [snippetId]: true
                }))
            .then(() => Object.assign({}, snippet, {
                id: snippetId
            }))
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

    async delete(snippet: Snippet, author: User) {
        // todo: remove contributions

        await this
            .database
            .object(this.snippetPath(snippet.id))
            .remove()

        return this
            .database
            .object(this.snippetByUidPath(snippet, author))
            .remove()
    }

    increaseLikesCounter(snippet: Snippet) {
        return this
            .database
            .object(this.likesCounterPath(snippet))
            .$ref
            .ref
            .transaction(count => count + 1)
    }

    decreaseLikesCounter(snippet: Snippet) {
        return this
            .database
            .object(this.likesCounterPath(snippet))
            .$ref
            .ref
            .transaction(count => count - 1)
    }

    increaseCodesCounter(snippet: Snippet) {
        return this
            .database
            .object(this.codesCounterPath(snippet))
            .$ref
            .ref
            .transaction(count => count + 1)
    }

    decreaseCodesCounter(snippet: Snippet) {
        return this
            .database
            .object(this.codesCounterPath(snippet))
            .$ref
            .ref
            .transaction(count => count - 1)
    }

    mockOne(): Snippet {
        return {
            id: null,
            name: null,
            description: null,
            date: null,
            author: null,
            codes: null,
            likes: null,
            likesCounter: 0,
            codesCounter: 0
        }
    }

    forgeAll(snippets: any[]) {
        return snippets.map((snippet: any): Snippet => this.forge(snippet))
    }

    forge(snippetFetched, options = { withCodes: false, withLikes: false }): Snippet {
        const snippet: Snippet = {
            id: snippetFetched.$key,
            name: snippetFetched.name,
            author: this.user.find(snippetFetched.author),
            description: snippetFetched.description,
            date: snippetFetched.date,
            codes: null,
            likes: null,
            likesCounter: parseInt(snippetFetched.likesCounter, 10),
            codesCounter: parseInt(snippetFetched.codesCounter, 10)
        }

        if (options.withCodes) {
            snippet.codes = this.code.all(snippet)
        }

        if (options.withLikes) {
            snippet.likes = this.like.all(snippet)
        }

        return snippet
    }

    forgeFromElastic(snippetElastic, options = { withCodes: false, withLikes: false }): Snippet {
        const snippetSource = snippetElastic._source

        const snippet: Snippet = {
            id: snippetElastic._id,
            name: snippetSource.name,
            author: this.user.find(snippetSource.author),
            description: snippetSource.description,
            date: snippetSource.date,
            codes: null,
            likes: null,
            likesCounter: parseInt(snippetSource.likesCounter, 10),
            codesCounter: parseInt(snippetSource.codesCounter, 10)
        }

        if (options.withCodes) {
            snippet.codes = this.code.all(snippet)
        }

        if (options.withLikes) {
            snippet.likes = this.like.all(snippet)
        }

        return snippet
    }

    private allFromDatabase(options?: any) {
        return this.database.list(this.snippetsPath(), options)
    }

    private allContributionsFromDatabase(author: User, options?: any) {
        return this.database.list(this.authorContributionsPath(author), options)
    }

    snippetsPath() {
        return '/snippets'
    }

    snippetPath(id: string) {
        return `${this.snippetsPath()}/${id}`
    }

    likesCounterPath(snippet: Snippet) {
        return `${this.snippetPath(snippet.id)}/likesCounter`
    }

    codesCounterPath(snippet: Snippet) {
        return `${this.snippetPath(snippet.id)}/codesCounter`
    }

    contributionsPath() {
        return 'contributions'
    }

    authorContributionsPath(author: User) {
        return `${this.contributionsPath()}/${author.id}`
    }

    snippetsByUidPath(author: User) {
        return `snippetsByUid/${author.id}`
    }

    snippetByUidPath(snippet: Snippet, author: User) {
        return `${this.snippetsByUidPath(author)}/${snippet.id}`
    }
}
