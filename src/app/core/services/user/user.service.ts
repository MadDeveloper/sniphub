import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { User } from '../../interfaces/user/user'
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UserService {
    private users: User[]

    constructor(private database: AngularFireDatabase) {
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

    find(username: string, options = {}): Observable<User> {
        return this.database.list(this.usersPath(), {
            query: {
                orderByChild: 'username',
                equalTo: username,
                limitToFirst: 1,
                ...options
            }
        }).map((users: any[]) => {
            if (users) {
                const user = users[0]

                return {
                    id: user.$key,
                    ...user
                }
            }

            return null
        })
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

    private usersPath() {
        return `/users`
    }

    private userPath(id: string) {
        return `${this.usersPath()}/${id}`
    }
}
