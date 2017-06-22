import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../core/interfaces/user/user'

@Injectable()
export class AuthenticationService {
    redirectUrl: string

    constructor(private router: Router) { }

    isAuthenticated() {
        return !!this.user
    }

    currentUser(): User {
        return this.user
    }

    login(user: User) {
        const url = this.redirectUrl || '/'

        this.user = user
        this.router.navigate([url])
    }

    logout() {
        this.user = null
        this.router.navigate(['/'])
    }

    set user(user: User) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    get user(): User {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch (e) {
            return null
        }
    }

}
