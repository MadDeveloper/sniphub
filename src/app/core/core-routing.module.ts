import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { NotFoundComponent } from './not-found/not-found.component'

@NgModule({
    imports: [ RouterModule.forChild([])],
    exports: [ RouterModule ]
})
export class CoreRoutingModule { }
