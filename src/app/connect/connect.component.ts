import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from 'app/services/authentication/authentication.service'
import { Router } from '@angular/router'
import { User } from 'app/interfaces/user'

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

    constructor(
        private authentication: AuthenticationService,
        private router: Router) { }

    ngOnInit() { }

    login() {
        const user: User = {
            id: 1,
            avatar: '/assets/images/unknown-2.jpg',
            username: 'Madeveloper',
            email: 'sergent.julien@icloud.com'
        }

        this.authentication.login(user)
    }

}
