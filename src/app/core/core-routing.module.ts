import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { NotFoundComponent } from './not-found/not-found.component'

@NgModule({
    imports: [ RouterModule.forChild([
        { path: '404', component: NotFoundComponent },
        // { path: '**', redirectTo: '/404' }
    ])],
    exports: [ RouterModule ]
})
export class CoreRoutingModule { }
