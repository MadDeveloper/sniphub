import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../services/notification/index'
import { Notification } from '../interfaces/notification/index'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    private notifications: Notification[] = []
    private loaded = false

    constructor(private notificationService: NotificationService) { }

    async ngOnInit() {
        // this.notifications = await this.notificationService.all()
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
