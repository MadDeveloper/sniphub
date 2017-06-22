import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { AuthenticationGuard } from '../authentication/guards/authentication.guard'
import { SnippetResolverGuard } from './guards/snippet-resolver.guard'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'

@NgModule({
    imports: [ RouterModule.forChild([
        { path: 'snippets/new', component: EditSnippetComponent, canActivate: [ AuthenticationGuard ] },
        {
            path: 'snippets/edit/:id',
            component: EditSnippetComponent,
            canActivate: [AuthenticationGuard],
            resolve: [ SnippetResolverGuard ]
        },
        { path: 'snippets/:id', component: SnippetDetailsComponent, resolve: [ SnippetResolverGuard ] }
    ])],
    exports: [ RouterModule ]
})
export class SnippetRoutingModule { }
