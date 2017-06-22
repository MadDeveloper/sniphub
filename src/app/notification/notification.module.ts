import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotificationRoutingModule } from './notification-routing.module'
import { NotificationsComponent } from './notifications.component'
import { NotificationService } from './services/notification.service'

@NgModule({
    imports: [
        CommonModule,
        NotificationRoutingModule
    ],
    declarations: [
        NotificationsComponent
    ],
    exports: [ NotificationsComponent ]
})
export class NotificationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NotificationModule,
            providers: [ NotificationService ]
        }
    }
}
