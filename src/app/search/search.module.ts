import { NgModule, ModuleWithProviders } from '@angular/core'
import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { CoreModule } from '../core/core.module'
import { SharedModule } from '../shared/shared.module'
import { SearchService } from './services/search.service'
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
