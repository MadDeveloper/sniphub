import { NgModule, ModuleWithProviders } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { AuthenticationRoutingModule } from './authentication-routing.module'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { AuthenticationGuard } from './guards/authentication.guard'
import { AuthenticationService } from './services/authentication.service'
import { RouterModule } from '@angular/router'

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        AuthenticationRoutingModule
    ],
    declarations: [
        ConnectComponent,
        SignupComponent
    ]
})
export class AuthenticationModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthenticationModule,
            providers: [
                AuthenticationGuard,
                AuthenticationService
            ]
        }
    }
}
