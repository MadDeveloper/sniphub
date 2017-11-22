import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'signin',
            component: ConnectComponent,
            canActivate: [MetaGuard],
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
