import * as firebase from 'firebase'
import find from 'lodash-es/find'
import { AngularFireDatabase } from 'angularfire2/database'
import { Comment } from '../../snippet/interfaces/comment'
import { config } from '../../../config'
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces'
import { Injectable } from '@angular/core'
import { Like } from '../../snippet/interfaces/like'
import { Notification } from '../interfaces/notification'
import { NotificationType } from '../interfaces/notification-type.enum'
import { Observable } from 'rxjs/Observable'
import { PaginableResponse } from '../../core/interfaces/response/paginable-response'
import { Request } from '../../request/interfaces/request'
import { Snippet } from '../../snippet/interfaces/snippet'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Subject } from 'rxjs/Subject'
import { User } from '../../core/interfaces/user/user'
import { UserService } from '../../core/services/user/user.service'

@Injectable()
export class NotificationService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService) { }

    all(user: User, endAt: string = null): Observable<PaginableResponse<Notification[]>> {
        const options: FirebaseListFactoryOpts = {
            query: {
                orderByKey: true,
                limitToLast: config.notifications.maxPerPage
            }
        }

        if (endAt) {
            options.query.endAt = endAt
        }

        return this
            .database
            .list(this.notificationsUserPath(user), options)
            .map((notifications: any[]) => this.forgeAll(notifications))
            .map(notifications => {
                const hits = notifications.slice().reverse()
                const canNext = notifications.length >= config.notifications.maxPerPage
                let next = null
                let lastNotification = null

                if (canNext) {
                    lastNotification = hits.pop()
                    next = () => this.all(user, lastNotification.id)
                }

                return {
                    canNext,
                    hits,
                    next
                }
            })
    }

    allRaw(user: User): Observable<Notification[]> {
        return this
            .database
            .list(this.notificationsUserPath(user))
            .map((notifications: any[]) => this.forgeAll(notifications))
    }

    unread(user: User): Observable<Notification[]> {
        return this
            .allRaw(user)
            .map((notifications: Notification[]): Notification[] => notifications.filter(notification => !notification.read))
    }

    like(snippet: Snippet, author: User, toUser: User) {
        return this
            .database
            .list(this.notificationsUserPath(toUser))
            .push({
                type: NotificationType.LIKE,
                user: author.id,
                snippetName: snippet.name,
                snippetId: snippet.id,
                read: false,
                date: firebase.database.ServerValue.TIMESTAMP
            })
    }

    comment(author: User, snippet: Snippet, toUser: User) {
        return this
            .database
            .list(this.notificationsUserPath(toUser))
            .push({
                type: NotificationType.COMMENT,
                user: author.id,
                snippetName: snippet.name,
                snippetId: snippet.id,
                read: false,
                date: firebase.database.ServerValue.TIMESTAMP
            })
    }

    request(author: User, snippet: Snippet, toUser: User, request: Request) {
        return this
            .database
            .list(this.notificationsUserPath(toUser))
            .push({
                type: NotificationType.REQUEST,
                user: author.id,
                snippetName: snippet.name,
                snippetId: snippet.id,
                read: false,
                date: firebase.database.ServerValue.TIMESTAMP,
                request: true,
                requestId: request.id
            })
    }

    markAllAsRead(notifications: Notification[], user: User) {
        notifications.forEach(notification => {
            if (!notification.read) {
                this.database
                    .object(this.notificationPath(notification, user))
                    .update({ read: true })
            }
        })
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

    forgeAll(notifications: any[]) {
        return notifications.map((notification: any): Notification => this.forge(notification))
    }

    forge(notification): Notification {
        return {
            id: notification.$key,
            type: notification.type,
            user: this.user.find(notification.user),
            snippetName: notification.snippetName,
            snippetId: notification.snippetId,
            request: notification.request || null,
            requestId: notification.requestId || null,
            read: notification.read,
            date: new Date(notification.date)
        }
    }

    private notificationsPath() {
        return '/notifications'
    }

    private notificationsUserPath(user: User) {
        return `${this.notificationsPath()}/${user.id}`
    }

    private notificationPath(notification: Notification, user: User) {
        return `${this.notificationsUserPath(user)}/${notification.id}`
    }
}
