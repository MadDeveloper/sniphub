import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { BsDropdownModule } from 'ngx-bootstrap'

import { routes } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppHeaderComponent } from './app-header/app-header.component'
import { HomeComponent } from './home/home.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { SnippetsListComponent } from './snippets-list/snippets-list.component'
import { SnippetService } from './services/snippet/snippet.service';
import { AddSnippetComponent } from './add-snippet/add-snippet.component'

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent,
    SnippetDetailsComponent,
    ConnectComponent,
    SignupComponent,
    ProfileComponent,
    EditProfileComponent,
    SnippetsListComponent,
    AddSnippetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    BsDropdownModule.forRoot()
  ],
  providers: [
      SnippetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
