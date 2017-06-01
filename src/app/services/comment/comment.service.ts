import { Injectable } from '@angular/core'
import { Comment } from '../../interfaces/comment'

@Injectable()
export class CommentService {

    all(): Comment[] {
        return [
            {
                id: 1,
                author: {
                    id: 1,
                    avatar: '/assets/images/unknown.jpg',
                    username: 'Madeveloper'
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
                    username: 'Thapple'
                },
                date: new Date(),
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
            },
            {
                id: 3,
                author: {
                    id: 3,
                    avatar: '/assets/images/unknown.jpg',
                    username: 'Matt'
                },
                date: new Date(),
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
            }
        ]
    }

}
