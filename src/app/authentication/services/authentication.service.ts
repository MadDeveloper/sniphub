import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserService } from '../../core/services/user/user.service'
import { Subscriber } from 'rxjs/Subscriber'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject }  from 'rxjs/BehaviorSubject'
import { StorageService } from '../../core/services/storage/storage.service'

@Injectable()
export class AuthenticationService {
    redirectUrl: string
    user: User
    user$: BehaviorSubject<User>
    logged: boolean
    logged$: BehaviorSubject<boolean>
    fails$: Subject<any>
    providerData: firebase.UserInfo
    private storageNamespace = 'authentication'

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private userService: UserService,
        private storage: StorageService) {

        this.logged = storage.find(this.storageNamespace, 'logged') || false
        this.user = storage.find(this.storageNamespace, 'user') || null
        this.providerData = storage.find(this.storageNamespace, 'providerData') || null
        this.fails$ = new Subject()
        this.logged$ = new BehaviorSubject<boolean>(this.logged)
        this.user$ = new BehaviorSubject<User>(this.user)
        this.observeAfAuth()
    }

    private observeAfAuth = () => this.afAuth.authState.subscribe(this.authEventReceived)

    private authEventReceived = userFirebase => {
        if (!this.logged && userFirebase && Array.isArray(userFirebase.providerData) && userFirebase.providerData.length > 0) {
            const providerData: firebase.UserInfo = userFirebase.providerData[0]

            if (!providerData.email) {
                return this.failsSignIn(
                    `User email was not provided by the provider.
                    Please check if you have authorized the application to access your informations.`)
            }

            this.providerData = providerData
            this.userService
                .createIfNotExists({
                    id: userFirebase.uid,
                    email: providerData.email,
                    username: null,
                    avatar: this.userService.photoURL(providerData.photoURL, providerData.uid),
                    github: null
                })
                .subscribe(async (userPromise: Promise<User>) => {
                    if (!this.logged) {
                        try {
                            this.user = await userPromise

                            if (this.user) {
                                this.successSignIn()
                            } else {
                                this.failsSignIn('User was not found.')
                            }
                        } catch (error) {
                            this.failsSignIn(error)
                        }
                    }
                })

        }
    }

    private successSignIn() {
        const url = this.redirectUrl || '/'

        this.logged = true
        this.userChanged()
        this.loggedChanged() // FIXME: stream is blocked after this line if the user login after page loaded (because of header-icons component, with watchers)
        this.router.navigateByUrl(url)
        this.redirectUrl = null
    }

    private userChanged() {
        this.storage.update(this.storageNamespace, {
            user: this.user,
            providerData: this.providerData
        })
        this.user$.next(this.user)
    }

    private loggedChanged() {
        this.storage.update(this.storageNamespace, {
            logged: this.logged
        })
        this.logged$.next(this.logged)
    }

    private failsSignIn(error) {
        this.fails$.next(error)
    }

    currentUser(): User {
        return this.user
    }

    // login(email, password) {
    //     const url = this.redirectUrl || '/'
    //     this.afAuth.auth.createUserWithEmailAndPassword('test@est.fr', '123regeg')
    //     this.afAuth.auth.signInWithEmailAndPassword('test@est.fr', '123regeg')
    //     this.user = user
    //     this.router.navigate([url])
    // }

    async loginGoogle() {
        try {
            await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        } catch (error) {
            this.failsSignIn(error.message)
        }
    }

    async loginGitHub() {
        try {
            await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
        } catch (error) {
            this.failsSignIn(error.message)
        }
    }

    async loginFacebook() {
        try {
            await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        } catch (error) {
            this.failsSignIn(error.message)
        }
    }

    logout() {
        this.user = null
        this.logged = false
        this.afAuth.auth.signOut()
        this.userChanged()
        this.loggedChanged()
        this.router.navigate(['/'])
    }

    reloadUser(user: User) {
        this.user = Object.assign({}, user)
        this.userChanged()
    }

    isAuthenticatedWithFacebook() {
        return this.providerData && 'facebook.com' === this.providerData.providerId
    }

    isAuthenticatedWithGitHub() {
        return this.providerData && 'github.com' === this.providerData.providerId
    }

    isAuthenticatedWithGoogle() {
        return this.providerData && 'google.com' === this.providerData.providerId
    }
}
