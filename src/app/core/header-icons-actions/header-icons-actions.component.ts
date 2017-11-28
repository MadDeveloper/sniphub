import { AuthenticationService } from '../../authentication/services/authentication.service'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Notification } from '../../notification/interfaces/notification'
import { NotificationService } from '../../notification/services/notification.service'
import { RequestService } from '../../request/services/request.service'
import { Subscription } from 'rxjs/Subscription'
import { User } from '../interfaces/user/user'

@Component({
    selector: 'app-header-icons-actions',
    templateUrl: './header-icons-actions.component.html',
    styleUrls: ['./header-icons-actions.component.scss']
})
export class HeaderIconsActionsComponent implements OnInit, OnDestroy {
    logged = false
    hasNotifications = false
    notificationObserver: Subscription
    hasPendingRequests = false
    requestsObserver: Subscription
    loggedObserver: Subscription
    user: User

    constructor(
        private router: Router,
        private authentication: AuthenticationService,
        private notification: NotificationService,
        private request: RequestService) { }

    ngOnInit() {
        this.user = this.authentication.currentUser()
        this.watchAuthentication()
        this.watchNotifications()
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        if (this.notificationObserver) {
            this.notificationObserver.unsubscribe()
        }

        if (this.loggedObserver) {
            this.loggedObserver.unsubscribe()
        }

        if (this.requestsObserver)  {
            this.requestsObserver.unsubscribe()
        }
    }

    checkUnreadNotifications(notifications: Notification[]) {
        this.hasNotifications = notifications.length > 0
    }

    watchAuthentication() {
        this.loggedObserver = this
            .authentication
            .logged$
            .subscribe(logged => this.logged = logged)
    }

    watchRequests() {
        if (!this.requestsObserver) {
            this.requestsObserver = this
                .request
                .all(this.user)
                .subscribe(requests => {
                    if (this.logged) {
                        this.hasPendingRequests = requests && requests.length > 0
                    }
                })
        }
    }

    watchNotifications() {
        if (!this.notificationObserver) {
            this.notificationObserver = this
                .notification
                .unread(this.user)
                .subscribe(notifications => {
                    if (this.logged) {
                        this.checkUnreadNotifications(notifications)
                    }
                })
        }
    }
}
