import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'

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

    constructor(private router: Router) { }

    ngOnInit() {
        this.searchEnabled = false
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.displayed = '/' !== event.url )
    }

    logIn() {
        this.isAuthenticated = true
        this.name = 'John Doe'
    }

    logOut() {
        this.isAuthenticated = false
    }

    toggleSearch() {
        this.searchEnabled = !this.searchEnabled
    }

}
