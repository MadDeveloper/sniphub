import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserService } from '../../core/services/user/user.service'
import { Subscriber } from 'rxjs/Subscriber'

@Injectable()
export class AuthenticationService {
    redirectUrl: string
    userFirebase: Observable<firebase.User>
    user: User
    logged: boolean
    fails$: Observable<any>
    private failsObserver: Subscriber<any>

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private userService: UserService) {
        this.logged = false
        this.userFirebase = afAuth.authState
        this.observeAuth()
        this.fails$ = Observable.create((observer: Subscriber<any>) => this.failsObserver = observer)
    }

    observeAuth() {
        this.afAuth
            .authState
            .subscribe(this.authEventReceived)
    }

    private authEventReceived = userFirebase => {
        if (userFirebase && Array.isArray(userFirebase.providerData) && userFirebase.providerData.length > 0) {
            const providerData = userFirebase.providerData[0]

            if (!providerData.email) {
                // todo: explain why
                this.failsSignIn(
                    `User email was not provided by the provider.
                    Please check if you have authorized the application to access your informations`)
            }

            this.userService
                .createIfNotExists({
                    id: userFirebase.uid,
                    email: providerData.email,
                    username: providerData.displayName,
                    avatar: providerData.photoURL
                })
                .subscribe(async (userPromise: Promise<User>) => {
                    try {
                        this.user = await userPromise

                        if (this.user) {
                            this.successSignIn()
                        } else {
                            this.failsSignIn('User was not found')
                        }
                    } catch (error) {
                        this.failsSignIn(error)
                    }
                })
        }
    }

    successSignIn() {
        const url = this.redirectUrl || '/'

        this.logged = true
        this.router.navigate([url])
        this.redirectUrl = null
    }

    failsSignIn(error) {
        this.failsObserver.next(error)
    }

    currentUser(): User {
        return this.user
    }

    // login(email, password) {
        // const url = this.redirectUrl || '/'
        // this.afAuth.auth.createUserWithEmailAndPassword('test@est.fr', '123regeg')
        // this.afAuth.auth.signInWithEmailAndPassword('test@est.fr', '123regeg')
        // this.user = user
        // this.router.navigate([url])
    // }

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
        this.logged = false
        this.afAuth.auth.signOut()
        this.router.navigate(['/'])
    }
}
