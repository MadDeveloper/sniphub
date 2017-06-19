// === Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { BsDropdownModule } from 'ngx-bootstrap'
import { CodemirrorModule } from 'ng2-codemirror'
import { TooltipModule } from 'ngx-bootstrap'
import { SelectModule } from 'ng2-select'
import { MomentModule } from 'angular2-moment'
import { InputCounterModule } from 'ng4-input-counter'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { routes } from './app-routing.module'

// === Guards
import { AuthenticationGuard } from './guards/authentication'
import { SnippetResolverGuard } from './guards/snippet'
import { SnippetsRequestsResolverGuard } from './guards/snippet/snippets-requests-resolver.guard'
import { SnippetRequestResolverGuard } from './guards/snippet/snippet-request-resolver.guard'
import { UserResolverGuard } from './guards/user'

// === Services
import { SnippetService } from './services/snippet/snippet.service'
import { CommentService } from './services/comment/comment.service'
import { LanguageService } from './services/language/language.service'
import { UserService } from './services/user/user.service'
import { AuthenticationService } from './services/authentication/authentication.service'
import { NotificationService } from './services/notification'
import { CodeEditorService } from './services/code-editor'
import { RequestService } from './services/request'
import { GuidService } from './services/guid/guid.service'
import { SearchService } from './services/search/search.service'
import { LikeService } from './services/like/like.service'
import { CodeService } from './services/code/code.service'

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
import { SnippetRequestComponent } from './snippet-request/snippet-request.component'
import { AppFooterComponent } from './app-footer/app-footer.component'
import { SearchComponent } from './search/search.component'
import { ContactComponent } from './contact/contact.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { SnippetsRequestsComponent } from './snippets-requests/snippets-requests.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { BackLinkComponent } from './back-link/back-link.component'

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
    SnippetRequestComponent,
    AppFooterComponent,
    SearchComponent,
    ContactComponent,
    NotificationsComponent,
    SnippetsRequestsComponent,
    NotFoundComponent,
    BackLinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    BsDropdownModule.forRoot(),
    CodemirrorModule,
    SelectModule,
    MomentModule,
    TooltipModule.forRoot(),
    InputCounterModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
      SnippetService,
      CommentService,
      LanguageService,
      UserService,
      AuthenticationService,
      AuthenticationGuard,
      SnippetResolverGuard,
      SnippetsRequestsResolverGuard,
      SnippetRequestResolverGuard,
      UserResolverGuard,
      NotificationService,
      CodeEditorService,
      RequestService,
      GuidService,
      SearchService,
      LikeService,
      CodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
