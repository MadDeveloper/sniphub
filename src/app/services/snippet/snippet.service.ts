import { Injectable } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { find } from 'lodash'
import { CodeService } from '../code/code.service'

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

    async all(): Promise<Snippet[]> {
        return Promise.resolve(this.snippets)
    }

    async find(props: any): Promise<Snippet> {
        return Promise.resolve(find(this.snippets, props))
    }

    async save(snippet: Snippet): Promise<boolean> {
        return Promise.resolve(true)
    }

    async delete(snippet: Snippet): Promise<boolean> {
        return Promise.resolve(true)
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
}
