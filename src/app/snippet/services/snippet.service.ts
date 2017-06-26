import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Snippet } from '../interfaces/snippet'
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../core/services/user/user.service'

@Injectable()
export class SnippetService {
    private snippets: Snippet[] = [
        {
            id: 1,
            date: new Date(),
            name: 'Trim',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            author: {
                id: 1,
                avatar: '/assets/images/unknown.jpg',
                username: 'John Doe',
                email: 'sergent.julien@icloud.com'
            },
            codes: [{
                id: 1,
                language: {
                    id: 1,
                    text: 'JavaScript',
                    value: 'javascript'
                },
                code: 'const snipz = "building..."'
            }]
        },
        {
            id: 2,
            date: new Date(),
            name: 'Trim',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            author: {
                id: 2,
                avatar: '/assets/images/unknown.jpg',
                username: 'Matt',
                email: 'matt@vdb.com'
            },
            codes: [{
                id: 1,
                language: {
                    id: 1,
                    text: 'JavaScript',
                    value: 'javascript'
                },
                code: 'const snipz = "building..."'
            }]
        },
        {
            id: 3,
            date: new Date(),
            name: 'Trim',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            author: {
                id: 3,
                avatar: '/assets/images/unknown.jpg',
                username: 'Zully',
                email: 'chez@pompo.te'
            },
            codes: [{
                id: 1,
                language: {
                    id: 1,
                    text: 'JavaScript',
                    value: 'javascript'
                },
                code: 'const snipz = "building..."'
            }]
        }
    ]

    constructor(
        private database: AngularFireDatabase,
        private user: UserService) { }

    all(options?: any): Observable<Snippet[]> {
        return this.database
            .list(this.snippetsPath(), options)
            .map(snippets => snippets.map(snippet => {
                snippet.author = this.user.find(snippet.author)

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
        // return {
        //     id: null,
        //     name: 'null',
        //     description: null,
        //     date: null,
        //     author: null,
        //     codes: null
        // }
        return this.snippets[0]
    }

    private snippetsPath() {
        return '/snippets'
    }

    private snippetPath(snippet: Snippet) {
        return `${this.snippetsPath()}/${snippet.name}`
    }
}
