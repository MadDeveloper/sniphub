import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { MomentModule } from 'angular2-moment'
import { SnippetsListComponent } from './components/snippets-list/snippets-list.component'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        MomentModule
    ],
    declarations: [ SnippetsListComponent ],
    exports: [ SnippetsListComponent ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only')
        }
    }
}
