import { Component } from '@angular/core'
import { UserService } from '../../core/services/user/user.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { Router } from '@angular/router'
import { config } from '../../../config';

@Component({
    selector: 'app-ask-username',
    templateUrl: './ask-username.component.html',
    styleUrls: ['./ask-username.component.scss']
})
export class AskUsernameComponent {
    username = ''
    error: string

    constructor(
        private user: UserService,
        private authentication: AuthenticationService,
        private router: Router) { }


    async setUsername() {
        const user = Object.assign({}, this.authentication.user)

        user.username = this.username

        try {
            // TODO: duplicated code with ProfileComponent, need to be externalized to a service
            const username = this.username
            const usernameConfig = config.profile.username

            if (username.length < usernameConfig.minLength) {
                throw new Error(`Username must contains at least ${usernameConfig.minLength} characters`)
            }

            if (username.length > usernameConfig.maxLength) {
                throw new Error(`Username cannot contains more than ${usernameConfig.maxLength} characters`)
            }

            this.error = null
            await this.user.changeUsername(user)
            this.authentication.reloadUser(user)
            this.router.navigateByUrl('/profile')
        } catch (error) {
            // TODO: sentry
            this.error = error.message || error
        }
    }

}
