import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { NotificationService } from '../../notification/services/notification.service'
import { Notification } from '../../notification/interfaces/notification'
import { User } from '../interfaces/user/user'

@Component({
  selector: 'app-header-icons-actions',
  templateUrl: './header-icons-actions.component.html',
  styleUrls: ['./header-icons-actions.component.scss']
})
export class HeaderIconsActionsComponent implements OnInit, OnDestroy {
    logged: boolean
    hasNotifications = false
    notificationObserver: Subscription
    loggedObserver: Subscription
    user: User

    constructor(
        private router: Router,
        private authentication: AuthenticationService,
        private notification: NotificationService) { }

    ngOnInit() {
        this.user = this.authentication.currentUser()
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.checkAuthentication())

        this.notificationObserver = this
            .notification
            .unread(this.user)
            .subscribe(this.checkUnreadNotifications)
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    private closeSubscriptions() {
        this.notificationObserver.unsubscribe()
        this.loggedObserver.unsubscribe()
    }

    checkUnreadNotifications = (notifications: Notification[]) => {
        this.hasNotifications = notifications.length > 0
    }

    checkAuthentication() {
        this.loggedObserver = this
            .authentication
            .logged$
            .subscribe(logged => this.logged = logged)
    }
}
