import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Location } from '@angular/common'

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent implements OnInit, OnDestroy {
    private routerObserver: Subscription
    private previousLink = '/'

    constructor(
        private router: Router,
        private location: Location) { }

    ngOnInit() {
        this.routerObserver  = this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => {})
    }

    ngOnDestroy() {
        this.routerObserver.unsubscribe()
    }
}
