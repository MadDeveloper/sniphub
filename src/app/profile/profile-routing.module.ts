import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'
import { UserResolverGuard } from '../core/guards/user/user-resolver.guard'

@NgModule({
    imports: [ RouterModule.forChild([
        { path: 'profile', component: ProfileComponent, canActivate: [ AuthenticationGuard ] },
        { path: 'profile/edit', component: EditProfileComponent, canActivate: [ AuthenticationGuard ] },
        { path: 'profile/:id', component: ProfileComponent, resolve: [ UserResolverGuard ] }
    ])],
    exports: [ RouterModule ]
})
export class ProfileRoutingModule { }
