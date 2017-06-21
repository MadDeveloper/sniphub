import { Component, OnInit, OnDestroy } from '@angular/core'
import { SnippetService } from 'app/services/snippet/snippet.service'
import { Snippet } from 'app/interfaces/snippet'
import { User } from '../interfaces/user'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from 'app/services/authentication/authentication.service'
import { Subscription } from 'rxjs/Subscription'
import { Notification } from '../notification/interfaces/notification/index'
import { NotificationService } from '../core/services/notification/notification.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    private routeDataObserver: Subscription
    private snippets: Snippet[]
    private user: User
    private loggedUser: User
    private pendingNotifications: boolean
    private notifications: Notification[]

    constructor(
        private snippetService: SnippetService,
        private route: ActivatedRoute,
        private router: Router,
        private authentication: AuthenticationService,
        private notification: NotificationService) { }

    async ngOnInit() {
        this.notifications = await this.notification.all()

        this.snippets = []
        this.snippets = await this.snippetService.all()
        this.pendingNotifications = this.notifications.length > 0

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

    containsRequestsNotifications() {
        return this.notification.containsRequestsNotifications(this.notifications)
    }

    goToRequests() {
        this.router.navigate(['/snippets/requests'])
    }
}
