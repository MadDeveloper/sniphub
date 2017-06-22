import { NgModule, Optional, SkipSelf } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { MomentModule } from 'angular2-moment'
import { NotificationService } from './services/notification/notification.service'
import { SearchService } from './services/search/search.service'
import { SnippetsListComponent } from './components/snippets-list/snippets-list.component';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        MomentModule
    ],
    declarations: [ SnippetsListComponent ],
    exports: [ SnippetsListComponent ],
    providers: [
        NotificationService,
        SearchService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only')
        }
    }
}
