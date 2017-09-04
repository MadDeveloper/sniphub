import { CoreModule } from '../core/core.module'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { SearchComponent } from './search.component'
import { SearchRoutingModule } from './search-routing.module'
import { SearchService } from './services/search.service'
import { SharedModule } from '../shared/shared.module'
import { SnippetModule } from '../snippet/snippet.module'

@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        SearchRoutingModule,
        SnippetModule
    ],
    declarations: [ SearchComponent ],
    exports: [ SearchComponent ]
})
export class SearchModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SearchModule,
            providers: [ SearchService ]
        }
    }
}
