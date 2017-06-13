import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { AuthenticationService } from 'app/services/authentication/authentication.service'
import { Subscription } from 'rxjs/Subscription'
import { NotificationService } from '../services/notification'

@Component({
  selector: 'app-header-icons-actions',
  templateUrl: './header-icons-actions.component.html',
  styleUrls: ['./header-icons-actions.component.scss']
})
export class HeaderIconsActionsComponent implements OnInit, OnDestroy {
    private isAuthenticated: boolean
    private routerEvent: Subscription
    private hasNotifications = false

    constructor(
        private router: Router,
        private authentication: AuthenticationService,
        private notifications: NotificationService) { }

    ngOnInit() {
        this.checkNotifications()
        this.isAuthenticated = this.authentication.isAuthenticated()
        this.routerEvent = this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.isAuthenticated = this.authentication.isAuthenticated())
    }

    ngOnDestroy() {
        this.routerEvent.unsubscribe()
    }

    async checkNotifications() {
        const notifications = await this.notifications.all()

        this.hasNotifications = notifications.length > 0
    }
}
