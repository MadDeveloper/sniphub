import { Component, OnInit } from '@angular/core'
import { Notification } from './interfaces/notification'
import { NotificationService } from './services/notification.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    private notifications: Notification[] = []
    loaded = false

    constructor(private notificationService: NotificationService) { }

    async ngOnInit() {
        this.notifications = await this.notificationService.all()
        this.notificationService.markAllAsRead([])
        this.loaded = true
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
}
