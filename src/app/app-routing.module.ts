import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { SnippetRequestComponent } from './snippet-request/snippet-request.component'
import { SnippetsRequestsComponent } from './snippets-requests/snippets-requests.component'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { ContactComponent } from './contact/contact.component'
import { SearchComponent } from './search/search.component'
import { AuthenticationGuard } from 'app/guards/authentication'
import { SnippetResolverGuard } from './guards/snippet/index'
import { UserResolverGuard } from './guards/user/index'
import { SnippetsRequestsResolverGuard } from './guards/snippet/snippets-requests-resolver.guard'
import { SnippetRequestResolverGuard } from './guards/snippet/snippet-request-resolver.guard'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'snippet/new', component: EditSnippetComponent, canActivate: [ AuthenticationGuard ] },
    {
        path: 'snippet/edit/:id',
        component: EditSnippetComponent,
        canActivate: [ AuthenticationGuard ],
        resolve: [ SnippetResolverGuard ]
    },
    {
        path: 'snippets/requests',
        component: SnippetsRequestsComponent,
        canActivate: [ AuthenticationGuard ],
        resolve: [ SnippetsRequestsResolverGuard ]
    },
    {
        path: 'snippets/requests/:id',
        component: SnippetRequestComponent,
        canActivate: [ AuthenticationGuard ],
        resolve: [ SnippetRequestResolverGuard ]
    },
    { path: 'snippet/:id', component: SnippetDetailsComponent, resolve: [ SnippetResolverGuard ] },
    { path: 'signin', component: ConnectComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [ AuthenticationGuard ] },
    { path: 'profile/edit', component: EditProfileComponent, canActivate: [ AuthenticationGuard ] },
    { path: 'profile/:id', component: ProfileComponent, resolve: [ UserResolverGuard ] },
    { path: 'contact', component: ContactComponent },
    { path: 'notifications', component: NotificationsComponent, canActivate: [ AuthenticationGuard ] }
]
