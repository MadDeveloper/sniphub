import { RouterModule, CanActivate } from '@angular/router'
import { NgModule } from '@angular/core'
import { SnippetsRequestsComponent } from './snippets-requests/snippets-requests.component'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'
import { SnippetRequestComponent } from './snippet-request/snippet-request.component'
import { SnippetRequestResolverGuard } from './guards/snippet-request-resolver.guard'
import { ProfileCompletedGuard } from '../profile/guards/profile-completed.guard'

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'requests',
            component: SnippetsRequestsComponent,
            canActivate: [AuthenticationGuard, ProfileCompletedGuard]
        },
        {
            path: 'requests/:id',
            component: SnippetRequestComponent,
            canActivate: [AuthenticationGuard, ProfileCompletedGuard],
            resolve: [SnippetRequestResolverGuard]
        }
    ])],
    exports: [RouterModule]
})
export class RequestRoutingModule {  }
