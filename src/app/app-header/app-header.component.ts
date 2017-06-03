import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { AuthenticationService } from 'app/services/authentication/authentication.service'
import { User } from 'app/interfaces/user'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    isAuthenticated: boolean
    name: string
    displayed = false
    searchEnabled: boolean

    constructor(
        private router: Router,
        private authentication: AuthenticationService) { }

    ngOnInit() {
        this.searchEnabled = false
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => {
                this.displayed = '/' !== event.url
                this.isAuthenticated = this.authentication.isAuthenticated()
            })
    }

    toggleSearch() {
        this.searchEnabled = !this.searchEnabled
    }

    goProfile() {
        this.router.navigate(['/profile'])
    }

}
