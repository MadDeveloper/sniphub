import { Routes, RouterModule } from '@angular/router'
import { NotificationsComponent } from './notifications/notifications.component'
import { AuthenticationGuard } from '../guards/authentication'
import { NgModule } from '@angular/core'

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'notifications', component: NotificationsComponent, canActivate: [AuthenticationGuard] }
    ])],
    exports: [RouterModule]
})
export default class NotificationRoutingModule { }
