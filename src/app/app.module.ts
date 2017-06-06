// === Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { BsDropdownModule } from 'ngx-bootstrap'
import { CodemirrorModule } from 'ng2-codemirror'
import { SelectModule } from 'ng2-select'
import { MomentModule } from 'angular2-moment'
import { routes } from './app-routing.module'

// === Guards
import { AuthenticationGuard } from './guards/authentication'
import { SnippetResolverGuard } from './guards/snippet'
import { UserResolverGuard } from './guards/user'

// === Services
import { SnippetService } from './services/snippet/snippet.service'
import { CommentService } from './services/comment/comment.service'
import { LanguageService } from './services/language/language.service'
import { UserService } from './services/user/user.service'
import { AuthenticationService } from './services/authentication/authentication.service'
import { Snippet } from './interfaces/snippet/index'

// === Components
import { AppComponent } from './app.component'
import { AppHeaderComponent } from './app-header/app-header.component'
import { HomeComponent } from './home/home.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'
import { ConnectComponent } from './connect/connect.component'
import { SignupComponent } from './signup/signup.component'
import { ProfileComponent } from './profile/profile.component'
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { SnippetsListComponent } from './snippets-list/snippets-list.component'
import { EditSnippetComponent } from './edit-snippet/edit-snippet.component'
import { CommentsComponent } from './comments/comments.component'
import { AddCodeComponent } from './add-code/add-code.component'
import { CodeBlockComponent } from './code-block/code-block.component'
import { HeaderIconsActionsComponent } from './header-icons-actions/header-icons-actions.component'
import { CodeRequestComponent } from './code-request/code-request.component'
import { AppFooterComponent } from './app-footer/app-footer.component'
import { SearchComponent } from './search/search.component';
import { ContactComponent } from './contact/contact.component'

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
    EditSnippetComponent,
    CommentsComponent,
    AddCodeComponent,
    CodeBlockComponent,
    HeaderIconsActionsComponent,
    CodeRequestComponent,
    AppFooterComponent,
    SearchComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    BsDropdownModule.forRoot(),
    CodemirrorModule,
    SelectModule,
    MomentModule
  ],
  providers: [
      SnippetService,
      CommentService,
      LanguageService,
      UserService,
      AuthenticationService,
      AuthenticationGuard,
      SnippetResolverGuard,
      UserResolverGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
