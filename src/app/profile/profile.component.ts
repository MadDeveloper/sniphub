import { Component, OnInit } from '@angular/core'
import { SnippetService } from 'app/services/snippet/snippet.service'
import { Snippet } from 'app/interfaces/snippet'
import { User } from '../interfaces/user/index'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from 'app/services/authentication/authentication.service'
import { Subscription } from 'rxjs/Subscription'
import { NotificationService } from '../services/notification/index'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    private routeDataObserver: Subscription
    private snippets: Snippet[]
    private user: User
    private loggedUser: User
    private pendingNotifications: boolean

    constructor(
        private snippetService: SnippetService,
        private route: ActivatedRoute,
        private router: Router,
        private authentication: AuthenticationService,
        private notification: NotificationService) { }

    ngOnInit() {
        this.snippets = []
        this.snippetService
            .all()
            .then( snippets => this.snippets = snippets )
        this.pendingNotifications = this.notification.all().length > 0

        if (this.authentication.isAuthenticated()) {
            this.loggedUser = this.user = this.authentication.currentUser()
        }

        if (this.route.snapshot.params['id']) {
            const userId = parseInt(this.route.snapshot.params['id'], 10)

            if (this.loggedUser && userId === this.loggedUser.id) {
                this.user = this.loggedUser
            } else {
                this.routeDataObserver = this
                    .route
                    .data
                    .subscribe((data: { user: User }) => this.user = data[0] )
            }
        }
    }

    ngOnDestroy() {
        if (this.routeDataObserver) {
            this.routeDataObserver.unsubscribe()
        }
    }

    ownProfile() {
        return this.loggedUser && this.user && this.loggedUser.id === this.user.id
    }

    signOut() {
        this.authentication.logout()
    }
}
