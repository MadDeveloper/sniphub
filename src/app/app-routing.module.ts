import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { ContactComponent } from './contact/contact.component'
import { NotFoundComponent } from './core/not-found/not-found.component'
import { ProfileCompletedGuard } from './profile/guards/profile-completed.guard'
import { MetaGuard } from '@ngx-meta/core'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [ProfileCompletedGuard, MetaGuard],
        data: {
            meta: {
                title: 'Find your dream code - SnipHub',
                description: 'SnipHub is a platform which permits you to retrieve or publish all the snippets code you ever dream never code again.'
            }
        }
    },
    {
        path: 'contact',
        component: ContactComponent,
        canActivate: [MetaGuard],
        data: {
            meta: {
                title: 'Contact',
                description: 'You can contact SnipHub team if you found any bug or anything else'
            }
        }
    },
    {
        path: '404',
        component: NotFoundComponent,
        canActivate: [MetaGuard],
        data: {
            meta: {
                title: '404'
            }
        }
    },
    {
        path: '**',
        redirectTo: '404'
    }
]
