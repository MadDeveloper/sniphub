import { Injectable } from '@angular/core'
import { Notification } from '../../interfaces/notification/index'
import { NotificationType } from '../../interfaces/notification/notification-type.enum'

@Injectable()
export class NotificationService {
    all(): Notification[] {
        return [
            {
                id: 1,
                type: NotificationType.REQUEST,
                user: {
                    id: 1,
                    username: 'Matt',
                    avatar: '/assets/images/unknown.jpg',
                    email: 'sergent.julien@icloud.com'
                },
                content: 'has added a new language code for your snippet',
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
                content: 'liked your snippet',
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
        ]
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
}
