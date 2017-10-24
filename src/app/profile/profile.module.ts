import { NgModule, ModuleWithProviders } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { SnippetModule } from '../snippet/snippet.module'
import { RouterModule } from '@angular/router'
import { CoreModule } from '../core/core.module'
import { BsDropdownModule } from 'ngx-bootstrap'
import { AskUsernameComponent } from './ask-username/ask-username.component'
import { ProfileCompletedGuard } from './guards/profile-completed.guard'

@NgModule({
    imports: [
        SharedModule,
        BsDropdownModule,
        RouterModule,
        CoreModule,
        ProfileRoutingModule,
        SnippetModule
    ],
    declarations: [
        ProfileComponent,
        EditProfileComponent,
        AskUsernameComponent
    ]
})
export class ProfileModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProfileModule,
            providers: [
                ProfileCompletedGuard
            ]
        }
    }
}
