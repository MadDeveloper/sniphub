import { Injectable } from '@angular/core'
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
                    user = this.forgeFromDatabase(userFetched)
                }

                return user
            })
    }

    findByUsername(username: string): Observable<User> {
        return this
            .database
            .list(this.usersPath(), {
                query: {
                    orderByChild: 'username',
                    equalTo: username
                }
            })
            .map((usersFetched: any[]): User => this.extractUserWithFindBy(usersFetched))
            .first()
    }


    findByEmail(email: string): Observable<User> {
        return this
            .database
            .list(this.usersPath(), {
                query: {
                    orderByChild: 'email',
                    equalTo: email
                }
            })
            .map((usersFetched: any[]): User => this.extractUserWithFindBy(usersFetched))
    }

    private extractUserWithFindBy(usersFetched: any[]): User {
        if (usersFetched.length > 0) {
            const userFetched = usersFetched[0]

            if (userFetched.$exists()) {
                return this.forgeFromDatabase(userFetched)
            }
        }

        return null
    }

    createIfNotExists(user: User): Observable<Promise<User>> {
        return this
            .findByEmail(user.email)
            .map(async (userBuilt: User): Promise<User> => {
                if (userBuilt) {
                    return Promise.resolve(userBuilt)
                }

                try {
                    return Promise.resolve(this.forgeFromDatabase(await this.create(user)))
                } catch (error) {
                    return Promise.reject(error)
                }
            })
    }

    create(user: User): firebase.Promise<any> {
        return this
            .database
            .object(this.userPath(user.id))
            .set({
                email: user.email,
                username: user.username,
                avatar: user.avatar,
                github: user.github
            })
    }

    edit(user: User) {
        return this
            .database
            .object(this.userPath(user.id))
            .update({
                avatar: user.avatar,
                username: user.username,
                email: user.email,
                github: user.github
            })
    }

    async changePassword(current: string, newPassword: string, confirm: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    async checkPassword(password: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    changeAvatar(user: User) {
        return this
            .database
            .object(this.userPath(user.id))
            .update({ avatar: user.avatar })
    }

    changeUsername(user: User) {
        return this
            .database
            .object(this.userPath(user.id))
            .update({ username: user.username })
    }

    changeGitHub(user: User) {
        return this
            .database
            .object(this.userPath(user.id))
            .update({ github: user.github })
    }

    checkPasswordStrength(password: string) {
        return true
    }

    forgeFromDatabase(userFetched): User {
        return {
            id: userFetched.$key,
            username: userFetched.username,
            email: userFetched.email,
            avatar: userFetched.avatar,
            github: userFetched.github
        }
    }

    photoURL(url, providerUid) {
        if (this.isFacebookPhoto(url)) {
            return `http://graph.facebook.com/${providerUid}/picture?width=800&height=800`
        }

        return url
    }

    private isFacebookPhoto(url: string) {
        return url.includes('fbcdn')
    }

    private usersPath() {
        return `/users`
    }

    private userPath(id: string) {
        return `${this.usersPath()}/${id}`
    }
}
