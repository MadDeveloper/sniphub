import { AskUsernameComponent } from './ask-username/ask-username.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { CoreModule } from '../core/core.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { InputCounterModule } from 'ng4-input-counter';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProfileCompletedGuard } from './guards/profile-completed.guard'
import { ProfileComponent } from './profile/profile.component'
import { ProfileRoutingModule } from './profile-routing.module'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { SnippetModule } from '../snippet/snippet.module'
import { TooltipModule } from 'ngx-bootstrap/tooltip/tooltip.module'

@NgModule({
    imports: [
        SharedModule,
        BsDropdownModule,
        TooltipModule,
        RouterModule,
        CoreModule,
        ProfileRoutingModule,
        InputCounterModule,
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
