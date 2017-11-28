import { AngularFireAuth } from 'angularfire2/auth'
import { AuthenticationService } from '../services/authentication.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { User } from '../../core/interfaces/user/user'


@Component({
    selector: 'app-connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit, OnDestroy {
    private authFailsObserver: Subscription
    error = ''
    inError = false

    constructor(
        private authentication: AuthenticationService,
        private router: Router,
        private afAuth: AngularFireAuth) {

    }

    ngOnInit() {
        this.watchAuthFails()
    }

    ngOnDestroy() {
        this.authFailsObserver.unsubscribe()
    }

    watchAuthFails() {
        this.authFailsObserver = this.authentication.fails$.subscribe(cause => {
            this.inError = true
            this.error = cause
        })
    }

    login() { }

    googleLogin() {
        this.authentication.loginGoogle()
    }

    githubLogin() {
        this.authentication.loginGitHub()
    }

    facebookLogin() {
        this.authentication.loginFacebook()
    }

}
