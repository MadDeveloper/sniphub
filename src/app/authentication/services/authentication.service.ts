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
                if (userFirebase && Array.isArray(userFirebase.providerData) && userFirebase.providerData.length > 0) {
                    const providerData = userFirebase.providerData[0]

                    if (!providerData.email) {
                        // todo: explain why
                        return
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
                                    this.logged = true
                                }
                            } catch (error) {
                                // todo: display the error
                                console.error(error)
                            }
                        })
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
        this.logout()
    }

    loginGitHub() {
        this.afAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider())
        this.logout()
    }

    loginFacebook() {
        this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        this.logout()
    }

    logout() {
        this.user = null
        this.afAuth.auth.signOut()
        // this.router.navigate(['/'])
    }
}
