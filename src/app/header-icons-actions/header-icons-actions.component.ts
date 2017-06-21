import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { AuthenticationService } from 'app/services/authentication/authentication.service'
import { Subscription } from 'rxjs/Subscription'
import { Notification } from '../notification/interfaces/notification/index'
import { NotificationService } from '../core/services/notification/notification.service'

@Component({
  selector: 'app-header-icons-actions',
  templateUrl: './header-icons-actions.component.html',
  styleUrls: ['./header-icons-actions.component.scss']
})
export class HeaderIconsActionsComponent implements OnInit, OnDestroy {
    private isAuthenticated: boolean
    private routerEvent: Subscription
    private hasNotifications = false
    private notificationObserver: Subscription

    constructor(
        private router: Router,
        private authentication: AuthenticationService,
        private notification: NotificationService) { }

    ngOnInit() {
        this.routerEvent = this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.checkAuthentication())

        this.notificationObserver = this.notification
            .notifications
            .subscribe((notifications: Notification[]) => this.checkNotifications(notifications))
    }

    ngOnDestroy() {
        this.routerEvent.unsubscribe()
        this.notificationObserver.unsubscribe()
    }

    checkNotifications(notifications: Notification[]) {
        this.hasNotifications = notifications.length > 0
    }

    checkAuthentication() {
        this.isAuthenticated = this.authentication.isAuthenticated()
    }
}
