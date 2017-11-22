import { Component, OnInit } from '@angular/core'
import { User } from '../../core/interfaces/user/user'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { MetaService } from '@ngx-meta/core';

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

    constructor(
        private authentication: AuthenticationService,
        private readonly meta: MetaService) { }

    ngOnInit() {
        this.user = this.authentication.currentUser()
        this.usernameSnapshot = this.user.username
        this.changeMeta()
    }

    changeTab(tab: string) {
        this.activeTab = tab
    }

    changeMeta() {
        this.meta.setTitle(`Editing ${this.user.username}`)
    }

}
