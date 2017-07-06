import { NgModule, ModuleWithProviders } from '@angular/core'
import { NotificationRoutingModule } from './notification-routing.module'
import { NotificationsComponent } from './notifications.component'
import { NotificationService } from './services/notification.service'
import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'
import { MomentModule } from 'angular2-moment'

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        MomentModule,
        NotificationRoutingModule
    ],
    declarations: [ NotificationsComponent ],
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
