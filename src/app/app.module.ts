import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { BsDropdownModule } from 'ngx-bootstrap'

import { routes } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppHeaderComponent } from './app-header/app-header.component'
import { HomeComponent } from './home/home.component';
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent,
    SnippetDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
