import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { User } from '../../interfaces/user/user'

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

    async find( props: any ): Promise<User> {
        return Promise.resolve(find(this.users, props ))
    }

    async edit(user: User): Promise<boolean> {
        return Promise.resolve(true)
    }

    async changePassword(current: string, newPassword: string, confirm: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    async checkPassword(password: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    checkPasswordStrength(password: string) {
        return true
    }
}
