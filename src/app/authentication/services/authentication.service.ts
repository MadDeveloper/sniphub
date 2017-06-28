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
    logged: boolean

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private userService: UserService) {
        this.logged = false
        this.userFirebase = afAuth.authState
        this.observeAuth()
    }

    observeAuth() {
        this.afAuth
            .authState
            .subscribe(userFirebase => {
                if (userFirebase) {
                    // this.userService
                    //     .find(userFirebase.uid)
                    //     .subscribe((user: User) => {
                    //         this.user = user

                    //         if (user) {
                    //             this.logged = true
                    //         }
                    //     })
                }
            })
    }

    currentUser(): User {
        return this.user
    }

    login(email, password) {
        // const url = this.redirectUrl || '/'
        // this.afAuth.auth.createUserWithEmailAndPassword('test@est.fr', '123regeg')
        // this.afAuth.auth.signInWithEmailAndPassword('test@est.fr', '123regeg')
        // this.user = user
        // this.router.navigate([url])
    }

    loginGoogle() {
        this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }

    loginGitHub() {
        this.afAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider())
    }

    loginFacebook() {
        this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
    }

    logout() {
        this.user = null
        this.afAuth.auth.signOut()
        this.router.navigate(['/'])
    }
}
