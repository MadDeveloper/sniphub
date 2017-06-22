import { NgModule, ModuleWithProviders } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { SnippetRequestComponent } from './snippet-request/snippet-request.component'
import { SnippetsRequestsComponent } from './snippets-requests/snippets-requests.component'
import { RequestService } from './services/request.service'
import { RequestRoutingModule } from './request-routing.module'
import { RouterModule } from '@angular/router'
import { CoreModule } from '../core/core.module'
import { MomentModule } from 'angular2-moment'
import { CodeModule } from '../code/code.module'
import { SnippetsRequestsResolverGuard } from './guards/snippets-requests-resolver.guard'
import { SnippetRequestResolverGuard } from './guards/snippet-request-resolver.guard'

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        RequestRoutingModule,
        CoreModule,
        MomentModule,
        CodeModule
    ],
    declarations: [
        SnippetRequestComponent,
        SnippetsRequestsComponent
    ]
})
export class RequestModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: RequestModule,
            providers: [
                RequestService,
                SnippetRequestResolverGuard,
                SnippetsRequestsResolverGuard
            ]
        }
    }
}
