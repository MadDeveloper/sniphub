import { Routes, RouterModule } from '@angular/router'
import { NotificationsComponent } from './notifications.component'
import { NgModule } from '@angular/core'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'

@NgModule({
    imports: [ RouterModule.forChild([
        { path: 'notifications', component: NotificationsComponent, canActivate: [ AuthenticationGuard ] }
    ])],
    exports: [ RouterModule ]
})
export class NotificationRoutingModule { }
