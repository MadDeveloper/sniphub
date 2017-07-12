import { Injectable } from '@angular/core'
import { find } from 'lodash'
import { Subject } from 'rxjs/Subject'
import { Notification } from '../interfaces/notification'
import { NotificationType } from '../interfaces/notification-type.enum'
import { AngularFireDatabase } from 'angularfire2/database'
import { User } from '../../core/interfaces/user/user'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../core/services/user/user.service'
import { SnippetService } from '../../snippet/services/snippet.service'
import { Like } from '../../snippet/interfaces/like'
import { Comment } from '../../snippet/interfaces/comment'
import { Snippet } from '../../snippet/interfaces/snippet'
import * as firebase from 'firebase'
import { Request } from '../../request/interfaces/request'

@Injectable()
export class NotificationService {
    constructor(
        private database: AngularFireDatabase,
        private user: UserService) { }

    all(user: User): Observable<Notification[]> {
        return this
            .database
            .list(this.notificationsUserPath(user), {
                query: {
                    orderByChild: 'date'
                }
            })
            .map((notifications: any[]) => this.forgeAll(notifications).reverse())
    }

    unread(user: User): Observable<Notification[]> {
        return this
            .all(user)
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
