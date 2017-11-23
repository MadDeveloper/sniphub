import { AuthenticationService } from '../authentication/services/authentication.service'
import {
    Component,
    HostListener,
    OnInit,
    OnDestroy
    } from '@angular/core'
import { Notification } from './interfaces/notification'
import { NotificationService } from './services/notification.service'
import { RequestService } from '../request/services/request.service'
import { Router } from '@angular/router'
import { ScrollService } from '../core/services/scroll/scroll.service'
import { User } from '../core/interfaces/user/user'
import { PaginableResponse } from '../core/interfaces/response/paginable-response'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    notifications: Notification[]
    loadingNextPage = false
    loaded = false
    user: User
    response: PaginableResponse<Notification[]>
    notificationsObserver: Subscription

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
        if (this.notificationsObserver) {
            this.notificationsObserver.unsubscribe()
        }
    }

    loadNotifications() {
        // we keep the last notifications sync with the database, in order to see in real time the new notifications
        this.notificationsObserver = this.notificationService
            .all(this.user)
            .subscribe(response => {
                this.response = response

                if (this.loaded) {
                    this.notifications = response.hits.concat(this.notifications.splice(0, response.hits.length))
                } else {
                    this.notifications = response.hits
                }

                this.loaded = true
                this.notificationService.markAllAsRead(response.hits, this.user)
            })
    }

    loadMoreNotifications() {
        const notifications$ = this.response.next() as Observable<PaginableResponse<Notification[]>>

        this.loadingNextPage = true

        notifications$.first().subscribe(response => {
            this.response = response
            this.notifications.push(...response.hits)
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
        this.router.navigateByUrl(`/requests/${notification.requestId}`)
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (this.loaded && this.scroll.documentScrolledBottom() && !this.loadingNextPage && this.response && this.response.canNext) {
            this.loadMoreNotifications()
        }
    }
}
