import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../services/notification/index'
import { Notification } from '../interfaces/notification/index'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    private notifications: Notification[]

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notifications = this.notificationService.all()
    }

    isRequestNotification(notification: Notification) {
        return this.notificationService.isRequestNotification(notification)
    }
}
