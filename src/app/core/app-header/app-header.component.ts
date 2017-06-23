import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
    private routerObserver: Subscription
    private isAuthenticated: boolean
    private name: string
    private homePage = false
    private searchEnabled: boolean
    private searchTerms = ''
    @ViewChild('searchInput')
    private searchInput: ElementRef

    constructor(private router: Router) { }

    ngOnInit() {
        this.searchEnabled = this.searchTerms.length > 0
        this.routerObserver = this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.homePage = '/' === event.url )
    }

    ngOnDestroy() {
        this.routerObserver.unsubscribe()
    }

    toggleSearch() {
        if (this.searchInput.nativeElement.value.length === 0) {
            this.searchEnabled = !this.searchEnabled
        }
    }

    goSearch() {
        this.router.navigate(['/search', { terms: this.searchTerms }])
    }
}
