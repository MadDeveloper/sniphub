import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import NotificationRoutingModule from './notification-routing.module'
import { NotificationsComponent } from './notifications.component'

@NgModule({
    imports: [
        CommonModule,
        NotificationRoutingModule
    ],
    declarations: [
        NotificationsComponent
    ],
    providers: []
})
export class NotificationModule { }
