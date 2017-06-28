import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { User } from '../../interfaces/user/user'
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable'
import * as firebase from 'firebase/app'

@Injectable()
export class UserService {
    constructor(private database: AngularFireDatabase) { }

    find(id: string): Observable<User> {
        return this
            .database
            .object(this.userPath(id))
            .map((userFetched: any): User => {
                let user: User = null

                if (userFetched.$exists()) {
                    user = this.buildOne(userFetched)
                }

                return user
            })
    }

    findByUsername(username: string, options = {}): Observable<User> {
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

    createIfNotExists(user: User): Observable<Promise<User>> {
        return this
            .database
            .object(this.userPath(user.id))
            .map(async (userFetched: any): Promise<User> => {
                if (userFetched.$exists()) {
                    return Promise.resolve(this.buildOne(userFetched))
                }

                try {
                    return await this.create(user)
                } catch (error) {
                    return Promise.reject(error)
                }
            })
    }

    create(user: User): firebase.Promise<any> {
        return this
            .database
            .object(this.userPath(user.id))
            .set(user)
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

    private buildOne(userFetched): User {
        return {
            id: userFetched.$key,
            username: userFetched.username,
            email: userFetched.email,
            avatar: userFetched.avatar
        }
    }

    private usersPath() {
        return `/users`
    }

    private userPath(id: string) {
        return `${this.usersPath()}/${id}`
    }
}
