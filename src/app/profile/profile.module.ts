import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { SnippetModule } from '../snippet/snippet.module'
import { BsDropdownModule } from 'ngx-bootstrap'
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        ProfileRoutingModule,
        SnippetModule,
        BsDropdownModule
    ],
    declarations: [
        ProfileComponent,
        EditProfileComponent
    ]
})
export class ProfileModule { }
