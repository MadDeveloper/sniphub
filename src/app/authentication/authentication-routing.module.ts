import { AuthenticationGuard } from './guards/authentication.guard'
import { ConnectComponent } from './connect/connect.component'
import { MetaGuard } from '@ngx-meta/core'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SignupComponent } from './signup/signup.component'

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'signin',
            component: ConnectComponent,
            canActivate: [MetaGuard, AuthenticationGuard],
            data: {
                meta: {
                    title: 'Sign in'
                }
            }
        },
        {
            path: 'signup',
            component: SignupComponent,
            canActivate: [MetaGuard],
            data: {
                meta: {
                    title: 'Sign up'
                }
            }
        }
    ])],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
