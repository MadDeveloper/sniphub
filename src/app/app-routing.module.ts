import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { ProfileComponent } from './profile/profile.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'snippet/:id', component: SnippetDetailsComponent },
    { path: 'connect', component:  ConnectComponent },
    { path: 'signUp', component:  SignupComponent },
    { path: 'profile', component: ProfileComponent }
]
