import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
    } from '@angular/core'
import { NetworkService } from '../services/network/network.service'
import { SearchService } from '../../search/services/search.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean
    name: string
    homePage = false
    searchEnabled: boolean
    searchTerms = ''
    @ViewChild('searchInput')
    searchInput: ElementRef
    searching = false
    hasNetworkConnection = true
    networkStateObserver: Subscription

    constructor(
        private router: Router,
        private searchService: SearchService,
        private network: NetworkService) { }

    ngOnInit() {
        this.listenNetworkState()
        this.searchEnabled = this.searchTerms.length > 0
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.homePage = '/' === event.url )
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        if (this.networkStateObserver) {
            this.networkStateObserver.unsubscribe()
        }
    }

    toggleSearch() {
        if (this.searchTerms.length === 0) {
            this.searchEnabled = !this.searchEnabled
        }
    }

    search() {
        if (this.searchTerms.length > 0) {
            this.searchService.changeTerms(this.searchTerms)
            this.router.navigateByUrl('/search')
        } else {
            this.router.navigateByUrl('/')
        }
    }

    listenNetworkState() {
        this.networkStateObserver = this.network.state$.subscribe(connected => this.hasNetworkConnection = connected)
    }
}
