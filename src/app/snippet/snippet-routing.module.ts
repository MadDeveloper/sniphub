import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'
import { SnippetResolverGuard } from './guards/snippet-resolver.guard'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { ProfileCompletedGuard } from '../profile/guards/profile-completed.guard'

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'snippets/new', component: EditSnippetComponent, canActivate: [AuthenticationGuard, ProfileCompletedGuard] },
        {
            path: 'snippets/edit/:id',
            component: EditSnippetComponent,
            canActivate: [AuthenticationGuard, ProfileCompletedGuard],
            resolve: [SnippetResolverGuard]
        },
        {
            path: 'snippets/:id',
            component: SnippetDetailsComponent,
            canActivate: [ProfileCompletedGuard],
            resolve: [SnippetResolverGuard]
        }
    ])],
    exports: [RouterModule]
})
export class SnippetRoutingModule { }
