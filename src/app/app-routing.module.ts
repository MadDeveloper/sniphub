import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ConnectComponent } from './connect/connect.component'
import { SnippetDetailsComponent } from './snippet-details/snippet-details.component'

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'snippet/:id', component: SnippetDetailsComponent },
    { path: 'connect', component:  ConnectComponent }
]
