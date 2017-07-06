import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '../../core/interfaces/user/user'
import { AuthenticationService } from '../services/authentication.service'

import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

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


    // let provider = new firebase.auth.GoogleAuthProvider()
    ngOnInit() {
        this.authFailsObserver = this.authentication.fails$.subscribe(cause => {
            this.inError = true
            this.error = cause
        })
    }

    ngOnDestroy() {
        this.authFailsObserver.unsubscribe()
    }

    login() {
        // const user: User = {
        //     id: 1,
        //     avatar: '/assets/images/unknown-2.jpg',
        //     username: 'Madeveloper',
        //     email: 'sergent.julien@icloud.com'
        // }

        // this.authentication.login('test@es.fr', '236')

    }

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
