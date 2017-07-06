import { Component, OnInit } from '@angular/core'
import { User } from '../../core/interfaces/user/user'
import { AuthenticationService } from '../../authentication/services/authentication.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

    activeTab = 'profile'
    user: User
    usernameSnapshot: string
    oldPassword: string
    password: string
    passwordConfirm: string

    constructor(private authentication: AuthenticationService) { }

    ngOnInit() {
        this.user = this.authentication.currentUser()
        this.usernameSnapshot = this.user.username
    }

    changeTab(tab: string) {
        this.activeTab = tab
    }

}
