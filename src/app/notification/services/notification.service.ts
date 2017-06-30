import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Subject } from 'rxjs/Subject'
import { Notification } from '../interfaces/notification'
import { NotificationType } from '../interfaces/notification-type.enum'
import { RequestService } from '../../request/services/request.service'

@Injectable()
export class NotificationService {
    notifications$: Subject<Notification[]>

    constructor(private request: RequestService) {
        this.notifications$ = new Subject()
        this.watch()
    }

    private async watch() {
        this.notify(await this.all())
    }

    private notify(notifications) {
        this.notifications$.next(notifications)
    }

    all(): Promise<Notification[]> {
        return Promise.resolve([])
    }

    markAllAsRead(notifications: Notification[]): Promise<boolean> {
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
