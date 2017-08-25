import { Component, OnInit, OnDestroy } from '@angular/core'
import { Notification } from './interfaces/notification'
import { NotificationService } from './services/notification.service'
import { Subscription } from 'rxjs/Subscription'
import { AuthenticationService } from '../authentication/services/authentication.service'
import { User } from '../core/interfaces/user/user'
import { RequestService } from '../request/services/request.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    notifications: Notification[]
    private notificationsObserver: Subscription
    loaded = false
    user: User

    constructor(
        private notificationService: NotificationService,
        private authentication: AuthenticationService,
        private request: RequestService,
        private router: Router) { }

    ngOnInit() {
        this.user = this.authentication.currentUser()
        this.loadNotifications()
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        this.notificationsObserver.unsubscribe()
    }

    loadNotifications() {
        this.notificationsObserver = this.notificationService
            .all(this.user)
            .subscribe(notifications => {
                this.notifications = notifications
                this.loaded = true
                this.notificationService.markAllAsRead(notifications, this.user)
            })
    }

    isRequestNotification(notification: Notification) {
        return this.notificationService.isRequestNotification(notification)
    }

    isCommentNotification(notification: Notification) {
        return this.notificationService.isCommentNotification(notification)
    }

    isLikeNotification(notification: Notification) {
        return this.notificationService.isLikeNotification(notification)
    }

    seeRequest(notification: Notification, event: Event) {
        event.preventDefault()
        this.request.storedSnippet = { id: notification.snippetId }
        this.router.navigate([`/requests/${notification.requestId}`])
    }
}
