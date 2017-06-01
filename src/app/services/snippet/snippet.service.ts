import { Injectable } from '@angular/core'
import { Snippet } from 'app/interfaces/snippet'

@Injectable()
export class SnippetService {

    all(): Snippet[] {
        return [
            {
                id: 1,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: 'John Doe'
            },
            {
                id: 2,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: 'John Doe'
            },
            {
                id: 3,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: 'John Doe'
            },
            {
                id: 4,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: 'John Doe'
            },
            {
                id: 5,
                date: new Date(),
                name: 'Trim',
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
                author: 'John Doe'
            }
        ]
    }

}
