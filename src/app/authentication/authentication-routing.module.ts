import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'

@NgModule({
    imports: [ RouterModule.forChild([
        { path: 'signin', component: ConnectComponent },
        { path: 'signup', component: SignupComponent }
    ])],
    exports: [ RouterModule ]
})
export class AuthenticationRoutingModule { }
