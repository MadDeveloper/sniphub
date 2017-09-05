import { AuthenticationService } from '../authentication/services/authentication.service'
import {
    Component,
    HostListener,
    OnDestroy,
    OnInit
    } from '@angular/core'
import { Notification } from './interfaces/notification'
import { NotificationService } from './services/notification.service'
import { RequestService } from '../request/services/request.service'
import { Router } from '@angular/router'
import { ScrollService } from '../core/services/scroll/scroll.service'
import { Subscription } from 'rxjs/Subscription'
import { User } from '../core/interfaces/user/user'
import { PaginableResponse } from '../core/interfaces/response/paginable-response'
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    notifications: Notification[]
    notificationsObserver: Subscription
    loadingNextPage = false
    loaded = false
    user: User
    response: PaginableResponse<Notification[]>

    constructor(
        private notificationService: NotificationService,
        private authentication: AuthenticationService,
        private request: RequestService,
        private router: Router,
        private scroll: ScrollService) { }

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
        const notifications$ = this.response ? this.response.next() as Observable<PaginableResponse<Notification[]>> : this.notificationService.all(this.user)

        this.loadingNextPage = true

        if (this.notificationsObserver) {
            this.notificationsObserver.unsubscribe()
        }

        this.notificationsObserver = notifications$.subscribe(response => {
            this.response = response

            if (this.loaded) {
                this.notifications.push(...response.hits)
            } else {
                this.notifications = response.hits
            }

            this.loaded = true
            this.loadingNextPage = false
            this.notificationService.markAllAsRead(response.hits, this.user)
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

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (this.scroll.documentScrolledBottom() && !this.loadingNextPage && (!this.response || this.response.canNext)) {
            this.loadNotifications()
        }
    }
}
