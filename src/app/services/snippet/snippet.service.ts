import { Injectable } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'
import { find } from 'lodash'

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
                    username: 'John Doe'
                }
            },
            {
                id: 2,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: {
                    id: 41,
                    avatar: '/assets/images/unknown.jpg',
                    username: 'Matt'
                }
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
                    username: 'Zully'
                }
            },
            {
                id: 4,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: {
                    id: 2,
                    avatar: '/assets/images/unknown.jpg',
                    username: 'Quentinove'
                }
            },
            {
                id: 5,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: {
                    id: 1,
                    avatar: '/assets/images/unknown.jpg',
                    username: 'Madeveloper'
                }
            }
        ]

    all(): Promise<Snippet[]> {
        return Promise.resolve(this.snippets)
    }

    find(id: number): Promise<Snippet> {
        return Promise.resolve(find(this.snippets, { id }))
    }

    mockOne(): Snippet {
        return {
            id: null,
            name: null,
            description: null,
            date: null,
            author: null
        }
    }
}
