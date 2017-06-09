import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from '../services/authentication/authentication.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    private name: string
    private email: string
    private description: string

    constructor(private authentication: AuthenticationService) { }

    ngOnInit() {
        if (this.authentication.isAuthenticated()) {
            const user = this.authentication.currentUser()

            this.name = user.username
            this.email = user.email
        }
    }
}
