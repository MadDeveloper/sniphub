import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'
import { UserResolverGuard } from '../core/guards/user/user-resolver.guard'
import { AskUsernameComponent } from './ask-username/ask-username.component'
import { ProfileCompletedGuard } from './guards/profile-completed.guard'

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard, ProfileCompletedGuard] },
        { path: 'profile/edit', component: EditProfileComponent, canActivate: [AuthenticationGuard] },
        { path: 'profile/ask-username', component: AskUsernameComponent, canActivate: [AuthenticationGuard] },
        { path: 'profile/:id', component: ProfileComponent, resolve: [UserResolverGuard], canActivate: [ProfileCompletedGuard] }
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
