import { Routes, RouterModule } from '@angular/router'
import { SearchComponent } from './search.component'
import { NgModule } from '@angular/core'

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'search', component: SearchComponent }
    ])],
    exports: [RouterModule],
    providers: []
})
export default class SearchRoutingModule { }
