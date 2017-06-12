import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private routerEventsObserver: Subscription

    constructor(private router: Router) { }

    ngOnInit() {
        this.routerEventsObserver = this
            .router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(() => window.scrollTo(0, 0) )
    }

    ngOnDestroy() {
        this.routerEventsObserver.unsubscribe()
    }
}
