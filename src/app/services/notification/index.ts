import { Injectable } from '@angular/core'
import { Notification } from '../../interfaces/notification/index'
import { NotificationType } from '../../interfaces/notification/notification-type.enum'
import { RequestService } from '../request'
import { find } from 'lodash'

@Injectable()
export class NotificationService {
    constructor(private request: RequestService) { }

    async all(): Promise<Notification[]> {
        return Promise.resolve([
            {
                id: 1,
                type: NotificationType.REQUEST,
                user: {
                    id: 1,
                    username: 'Matt',
                    avatar: '/assets/images/unknown.jpg',
                    email: 'sergent.julien@icloud.com'
                },
                snippet: {
                    id: 1,
                    name: 'Trim',
                    description: '',
                    author: {
                        id: 1,
                        username: 'Matt',
                        avatar: '/assets/images/unknown.jpg',
                        email: 'sergent.julien@icloud.com'
                    },
                    date: new Date()
                },
                request: await this.request.find({ id: 1 })
            },
            {
                id: 1,
                type: NotificationType.LIKE,
                user: {
                    id: 1,
                    username: 'John Doe',
                    avatar: '/assets/images/unknown-2.jpg',
                    email: 'sergent.julien@icloud.com'
                },
                snippet: {
                    id: 1,
                    name: 'Trim',
                    description: '',
                    author: {
                        id: 1,
                        username: 'Matt',
                        avatar: '/assets/images/unknown.jpg',
                        email: 'sergent.julien@icloud.com'
                    },
                    date: new Date()
                }
            }
        ])
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
