import { Injectable } from '@angular/core'
import { User } from 'app/interfaces/user'
import { LocalUser } from 'app/interfaces/user/LocalUser'

@Injectable()
export class AuthenticationService {

    isAuthenticated() {
        return this.user && this.user.logged
    }

    currentUser(): LocalUser {
        return this.user
    }

    login(user: User) {
        const localUser: LocalUser = {
            user,
            logged: true
        }
        this.user = localUser
    }

    logout() {
        this.user = null
    }

    set user(user: LocalUser) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    get user() {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch (e) {
            return null
        }
    }

}
