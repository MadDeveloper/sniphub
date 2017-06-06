import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { CodeRequestComponent } from './code-request/code-request.component'
import { ContactComponent } from './contact/contact.component'
import { AuthenticationGuard } from 'app/guards/authentication'
import { SnippetResolverGuard } from './guards/snippet/index'
import { UserResolverGuard } from './guards/user/index'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'snippet/new', component: EditSnippetComponent, canActivate: [ AuthenticationGuard ] },
    { path: 'snippet/edit/:id', component: EditSnippetComponent, canActivate: [ AuthenticationGuard ], resolve: [ SnippetResolverGuard ] },
    { path: 'snippet/:id', component: SnippetDetailsComponent, resolve: [ SnippetResolverGuard ] },
    { path: 'signin', component: ConnectComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthenticationGuard ] },
    { path: 'profile/edit', component: EditProfileComponent, canActivate: [ AuthenticationGuard ] },
    { path: 'profile/:id', component: ProfileComponent, resolve: [ UserResolverGuard ] },
    { path: 'contact', component: ContactComponent },
    { path: 'request', component: CodeRequestComponent, canActivate: [ AuthenticationGuard ] }
]
