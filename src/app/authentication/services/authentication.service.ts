import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserService } from '../../core/services/user/user.service'
import { Subscriber } from 'rxjs/Subscriber'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class AuthenticationService {
    redirectUrl: string
    user: User
    user$: BehaviorSubject<User>
    logged: boolean
    logged$: BehaviorSubject<boolean>
    fails$: ReplaySubject<any>

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private userService: UserService) {

        this.logged = false
        this.fails$ = new ReplaySubject()
        this.logged$ = new BehaviorSubject<boolean>(this.logged)
        this.user$ = new BehaviorSubject<User>(this.user)
        this.observeAfAuth()
    }

    private observeAfAuth = () => this.afAuth.authState.subscribe(this.authEventReceived)

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
                        console.log(error)
                        this.failsSignIn(error)
                    }
                })
        }
    }

    private successSignIn() {
        const url = this.redirectUrl || '/'

        this.logged = true
        this.userChanged()
        this.loggedChanged()
        this.router.navigate([url])
        this.redirectUrl = null
    }

    private userChanged() {
        this.user$.next(this.user)
    }

    private loggedChanged() {
        this.logged$.next(this.logged)
    }

    private failsSignIn(error) {
        this.fails$.next(error)
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
        this.userChanged()
        this.loggedChanged()
        this.router.navigate(['/'])
    }
}
