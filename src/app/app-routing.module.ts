import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { CodeRequestComponent } from './code-request/code-request.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'snippet/new', component: EditSnippetComponent },
    { path: 'snippet/edit/:id', component: EditSnippetComponent },
    { path: 'snippet/:id', component: SnippetDetailsComponent },
    { path: 'connect', component: ConnectComponent },
    { path: 'signUp', component: SignupComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'profile/edit', component: EditProfileComponent },
    { path: 'request', component: CodeRequestComponent }
]
