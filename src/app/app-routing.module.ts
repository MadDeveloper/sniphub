import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { ContactComponent } from './contact/contact.component'
import { NotFoundComponent } from './core/not-found/not-found.component'

export const routes: Routes = [
    { path: 'contact', component: ContactComponent },
    { path: '', component: HomeComponent },
    { path: '404', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
]
