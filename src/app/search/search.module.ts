import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { CoreModule } from '../core/core.module'
import { SharedModule } from '../shared/shared.module'
import { SearchService } from './services/search.service'

@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        SearchRoutingModule
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
