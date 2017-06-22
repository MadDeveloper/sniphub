import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import SearchRoutingModule from './search-routing.module'
import { SearchComponent } from './search.component'
import { CoreModule } from '../core/core.module'

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SearchRoutingModule
    ],
    declarations: [ SearchComponent ],
    exports: [ SearchComponent ],
    providers: []
})
export class SearchModule { }
