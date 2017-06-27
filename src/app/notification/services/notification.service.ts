import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Observable } from 'rxjs/Observable'
import { Subscriber } from 'rxjs/Subscriber'
import { Subscription } from 'rxjs/Subscription'
import { Notification } from '../interfaces/notification'
import { NotificationType } from '../interfaces/notification-type.enum'
import { RequestService } from '../../request/services/request.service'

@Injectable()
export class NotificationService {
    private observer: Subscriber<{}>
    notifications: Observable<Notification[]>

    constructor(private request: RequestService) {
        this.notifications = new Observable(observer => {
            this.observer = observer
            this.watch()
        })
    }

    private async watch() {
        this.notify(await this.all())
    }

    async all(): Promise<Notification[]> {
        return Promise.resolve([])
    }

    private notify(value) {
        this.observer.next(value)
    }

    async markAllAsRead(notifications: Notification[]): Promise<boolean> {
        this.notify([])

        return Promise.resolve(true)
    }

    isRequestNotification(notification: Notification) {
        return notification.type === NotificationType.REQUEST
    }

    isLikeNotification(notification: Notification) {
        return notification.type === NotificationType.LIKE
    }

    isCommentNotification(notification: Notification) {
        return notification.type === NotificationType.COMMENT
    }

    containsRequestsNotifications(notifications: Notification[]) {
        return !!find(notifications, { type: NotificationType.REQUEST })
    }
}
