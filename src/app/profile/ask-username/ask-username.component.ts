import { Component } from '@angular/core'
import { UserService } from '../../core/services/user/user.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-ask-username',
    templateUrl: './ask-username.component.html',
    styleUrls: ['./ask-username.component.scss']
})
export class AskUsernameComponent {
    username: string

    constructor(
        private user: UserService,
        private authentication: AuthenticationService,
        private router: Router) { }


    setUsername() {
        const user = Object.assign({}, this.authentication.user)

        if (this.username !== user.username) {
            user.username = this.username
            this.user.changeUsername(user)
            this.authentication.reloadUser(user)
            this.router.navigateByUrl('/profile')
        }
    }

}
