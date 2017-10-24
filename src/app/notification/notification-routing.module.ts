import { Routes, RouterModule } from '@angular/router'
import { NotificationsComponent } from './notifications.component'
import { NgModule } from '@angular/core'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'
import { ProfileCompletedGuard } from '../profile/guards/profile-completed.guard'

@NgModule({
    imports: [ RouterModule.forChild([
        { path: 'notifications', component: NotificationsComponent, canActivate: [ AuthenticationGuard, ProfileCompletedGuard ] }
    ])],
    exports: [ RouterModule ]
})
export class NotificationRoutingModule { }
