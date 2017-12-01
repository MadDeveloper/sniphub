import { AuthenticationService } from '../../authentication/services/authentication.service'
import { Component } from '@angular/core'
import { config } from '../../../config'
import { Router } from '@angular/router'
import { UserService } from '../../core/services/user/user.service'

@Component({
    selector: 'app-ask-username',
    templateUrl: './ask-username.component.html',
    styleUrls: ['./ask-username.component.scss']
})
export class AskUsernameComponent {
    username = ''
    error: string
    usernameMinLength = config.profile.username.minLength
    usernameMaxLength = config.profile.username.maxLength

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

            if (username.length < this.usernameMinLength) {
                throw new Error(`Username must contains at least ${this.usernameMinLength} characters`)
            }

            if (username.length > this.usernameMaxLength) {
                throw new Error(`Username cannot contains more than ${this.usernameMaxLength} characters`)
            }

            const exists = await this.user.findByUsername(username)

            if (exists) {
                throw new Error(`This username is already taken`)
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
