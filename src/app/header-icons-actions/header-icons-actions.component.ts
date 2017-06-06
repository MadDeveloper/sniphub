import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { AuthenticationService } from 'app/services/authentication/authentication.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-header-icons-actions',
  templateUrl: './header-icons-actions.component.html',
  styleUrls: ['./header-icons-actions.component.scss']
})
export class HeaderIconsActionsComponent implements OnInit, OnDestroy {
    private isAuthenticated: boolean
    private routerEvent: Subscription

    constructor(
        private router: Router,
        private authentication: AuthenticationService) { }

    ngOnInit() {
        this.isAuthenticated = this.authentication.isAuthenticated()
        this.routerEvent = this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.isAuthenticated = this.authentication.isAuthenticated())
    }

    ngOnDestroy() {
        this.routerEvent.unsubscribe()
    }

    signOut() {
        this.authentication.logout()
    }

}
