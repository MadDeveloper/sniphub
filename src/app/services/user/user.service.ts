import { Injectable } from '@angular/core'
import { User } from 'app/interfaces/user'
import { find } from 'lodash'

@Injectable()
export class UserService {
    private users: User[]

    constructor() {
        this.users = [
            {
                id: 1,
                username: 'Madeveloper',
                email: 'sergent.julien@icloud.com',
                avatar: '/assets/images/unknown-2.jpg'
            },
            {
                id: 2,
                username: 'Matt',
                email: 'matt@vdb.com',
                avatar: '/assets/images/unknown.jpg'
            },
            {
                id: 3,
                username: 'Sully',
                email: 'lapomme@pompote.io',
                avatar: '/assets/images/unknown.jpg'
            }
        ]
    }

    find( props: any ): Promise<User> {
        return Promise.resolve(find(this.users, props ))
    }
}
