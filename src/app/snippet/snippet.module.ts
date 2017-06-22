import { NgModule, ModuleWithProviders } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { CommentsComponent } from './comments/comments.component'
import { SnippetResolverGuard } from './guards/snippet-resolver.guard'
import { CommentService } from './services/comment.service'
import { LikeService } from './services/like.service'
import { SnippetService } from './services/snippet.service'
import { SnippetRoutingModule } from './snippet-routing.module'
import { CodeModule } from '../code/code.module'
import { SnippetsListComponent } from './snippets-list/snippets-list.component'
import { RouterModule } from '@angular/router'
import { MomentModule } from 'angular2-moment'
import { InputCounterModule } from 'ng4-input-counter'
import { BsDropdownModule } from 'ngx-bootstrap'

@NgModule({
    imports: [
        SharedModule,
        SnippetRoutingModule,
        CodeModule,
        RouterModule,
        MomentModule,
        InputCounterModule,
        BsDropdownModule
    ],
    declarations: [
        SnippetsListComponent,
        SnippetDetailsComponent,
        EditSnippetComponent,
        CommentsComponent
    ],
    exports: [
        SnippetDetailsComponent,
        SnippetsListComponent
    ]
})
export class SnippetModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SnippetModule,
            providers: [
                SnippetResolverGuard,
                CommentService,
                LikeService,
                SnippetService
            ]
        }
    }
}
