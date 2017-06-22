import { Injectable } from '@angular/core'
import { Comment } from '../interfaces/comment'
import { Snippet } from '../interfaces/snippet'
import { User } from '../../core/interfaces/user/user'

@Injectable()
export class CommentService {
    async all(snippet: Snippet): Promise<Comment[]> {
        return [
            {
                id: 1,
                author: {
                    id: 1,
                    avatar: '/assets/images/unknown-2.jpg',
                    username: 'John Doe',
                    email: 'sergent.julien@icloud.com'
                },
                date: new Date(),
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
            },
            {
                id: 2,
                author: {
                    id: 2,
                    avatar: '/assets/images/unknown.jpg',
                    username: 'Matt',
                    email: 'matt@vdb.com'
                },
                date: new Date(),
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: '/assets/images/unknown-2.jpg',
                    username: 'Zully',
                    email: 'chez@pompo.te'
                },
                date: new Date(),
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
            }
        ]
    }

    forge(comment: string, author: User): Comment {
        return {
            id: null,
            author,
            date: new Date(),
            content: comment
        }
    }

    async add(comment: Comment, snippet: Snippet): Promise<boolean> {
        return Promise.resolve(true)
    }
}
