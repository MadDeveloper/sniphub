import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { }

    ngOnInit() {
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(() => window.scrollTo(0, 0) )
    }
}
