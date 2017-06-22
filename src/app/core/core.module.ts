import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { AppFooterComponent } from './app-footer/app-footer.component'
import { AppHeaderComponent } from './app-header/app-header.component'
import { BackLinkComponent } from './back-link/back-link.component'
import { HeaderIconsActionsComponent } from './header-icons-actions/header-icons-actions.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { GuidService } from './services/guid/guid.service'
import { UserService } from './services/user/user.service'
import { UserResolverGuard } from './guards/user/user-resolver.guard'
import { CoreRoutingModule } from './core-routing.module'

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        CoreRoutingModule
    ],
    declarations: [
        AppFooterComponent,
        AppHeaderComponent,
        BackLinkComponent,
        HeaderIconsActionsComponent,
        NotFoundComponent
    ],
    exports: [
        AppFooterComponent,
        AppHeaderComponent,
        BackLinkComponent,
        HeaderIconsActionsComponent,
        NotFoundComponent
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                GuidService,
                UserService,
                UserResolverGuard
            ]
        }
    }

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only')
        }
    }
}
