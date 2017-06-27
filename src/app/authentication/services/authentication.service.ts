import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserService } from '../../core/services/user/user.service'

@Injectable()
export class AuthenticationService {
    redirectUrl: string
    userFirebase: Observable<firebase.User>
    user: User

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private userService: UserService) {
        this.userFirebase = afAuth.authState

        this.userFirebase.subscribe(userFirebase => {
            console.log(userFirebase)
            if (userFirebase) {

                this.userService
                    .find(userFirebase.uid)
                    .map(user => {
                        this.user = user
                        console.log(user.email)
                    })


            }
        })
    }

    isAuthenticated() {
        return !!this.user
    }

    currentUser(): User {
        return this.user
    }

    login(user: User) {
        const url = this.redirectUrl || '/'

        // this.user = user
        this.router.navigate([url])
    }

    loginGoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    }

    loginGitHub() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    }

    loginFacebook() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    }

    logout() {
        this.user = null
        this.router.navigate(['/'])
    }

    // set user(user: User) {
    //     localStorage.setItem('user', JSON.stringify(user))
    // }

    // get user(): User {
    //     try {
    //         return JSON.parse(localStorage.getItem('user'))
    //     } catch (e) {
    //         return null
    //     }
    // }

}
