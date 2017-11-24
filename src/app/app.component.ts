import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        angulartics2GoogleTagManager: Angulartics2GoogleTagManager) { }

    ngOnInit() {
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(() => window.scrollTo(0, 0) )
    }
}
