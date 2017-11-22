import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'
import { SnippetResolverGuard } from './guards/snippet-resolver.guard'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { ProfileCompletedGuard } from '../profile/guards/profile-completed.guard'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'snippets',
            canActivateChild: [MetaGuard],
            children: [
                {
                    path: 'new',
                    component: EditSnippetComponent,
                    canActivate: [AuthenticationGuard, ProfileCompletedGuard],
                    data: {
                        meta: {
                            title: 'New snippet'
                        }
                    }
                },
                {
                    path: 'edit/:id',
                    component: EditSnippetComponent,
                    canActivate: [AuthenticationGuard, ProfileCompletedGuard],
                    resolve: [SnippetResolverGuard]
                },
                {
                    path: ':id',
                    component: SnippetDetailsComponent,
                    canActivate: [ProfileCompletedGuard],
                    resolve: [SnippetResolverGuard]
                }
            ]
        }
    ])],
    exports: [RouterModule]
})
export class SnippetRoutingModule { }
