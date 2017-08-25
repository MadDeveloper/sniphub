import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { SnippetModule } from '../snippet/snippet.module'
import { RouterModule } from '@angular/router'
import { CoreModule } from '../core/core.module'
import { BsDropdownModule } from 'ngx-bootstrap'

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
        EditProfileComponent
    ]
})
export class ProfileModule { }
