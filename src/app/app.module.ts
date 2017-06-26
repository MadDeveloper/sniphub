// === Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { CoreModule } from './core/core.module'
import { BsDropdownModule } from 'ngx-bootstrap'
import { TooltipModule } from 'ngx-bootstrap'
import { InputCounterModule } from 'ng4-input-counter'
import { NotificationModule } from './notification/notification.module'
import { SearchModule } from './search/search.module'
import { SnippetModule } from './snippet/snippet.module'
import { RequestModule } from './request/request.module'
import { ProfileModule } from './profile/profile.module'
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'

// === configurations
import { routes } from './app-routing.module'
import { environment } from '../environments/environment'

// === Services
import { SweetAlertService } from 'ng2-sweetalert2'

// === Components
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { ContactComponent } from './contact/contact.component'
import { CodeModule } from './code/code.module'
import { AuthenticationModule } from './authentication/authentication.module'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        CoreModule.forRoot(),
        RouterModule.forRoot( routes ),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AuthenticationModule.forRoot(),
        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        InputCounterModule.forRoot(),
        NotificationModule.forRoot(),
        SearchModule.forRoot(),
        RequestModule.forRoot(),
        SnippetModule.forRoot(),
        CodeModule.forRoot(),
        ProfileModule
    ],
    providers: [ SweetAlertService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
