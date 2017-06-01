import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { BsDropdownModule } from 'ngx-bootstrap'
import { AceEditorModule } from 'ng2-ace-editor';
import { routes } from './app-routing.module'
import { AppComponent } from './app.component'
import { MarkdownModule } from 'angular2-markdown'
import { AppHeaderComponent } from './app-header/app-header.component'
import { HomeComponent } from './home/home.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { SnippetsListComponent } from './snippets-list/snippets-list.component'
import { AddSnippetComponent } from './add-snippet/add-snippet.component'
import { CommentsComponent } from './comments/comments.component'

import { SnippetService } from './services/snippet/snippet.service'
import { CommentService } from './services/comment/comment.service'

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
    AddSnippetComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    BsDropdownModule.forRoot(),
    MarkdownModule.forRoot(),
    AceEditorModule
  ],
  providers: [
      SnippetService,
      CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
