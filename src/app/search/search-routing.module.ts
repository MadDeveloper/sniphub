import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SearchComponent } from './search.component'
import { ProfileCompletedGuard } from '../profile/guards/profile-completed.guard'

@NgModule({
    imports: [ RouterModule.forChild([
        { path: 'search', component: SearchComponent, canActivate: [ProfileCompletedGuard] }
    ])],
    exports: [ RouterModule ]
})
export class SearchRoutingModule { }
