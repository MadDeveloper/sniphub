import { Injectable } from '@angular/core'
import { User } from 'app/interfaces/user'
import { LocalUser } from 'app/interfaces/user/LocalUser'
import { Router } from '@angular/router'

@Injectable()
export class AuthenticationService {
    redirectUrl: string

    constructor(private router: Router) { }

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
        const url = this.redirectUrl || '/'

        this.user = localUser
        this.router.navigate([url])
    }

    logout() {
        this.user = null
        this.router.navigate(['/'])
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
