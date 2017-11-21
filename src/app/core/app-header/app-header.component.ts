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
import { Subject } from 'rxjs/Subject'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean
    name: string
    homePage = false
    searchEnabled = false
    searchTerms = new Subject<string>()
    @ViewChild('searchInput')
    searchInput: ElementRef
    searching = false
    hasNetworkConnection = true
    networkStateObserver: Subscription
    debounceTimeSearchInput = 300
    searchTermsObserver: Subscription

    constructor(
        private router: Router,
        private searchService: SearchService,
        private network: NetworkService) { }

    ngOnInit() {
        this.listenNetworkState()
        this.listenSearchEvents()
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

        if (this.searchTermsObserver) {
            this.searchTermsObserver.unsubscribe()
        }
    }

    listenSearchEvents() {
        this.searchTermsObserver = this
            .searchTerms
            .debounceTime(this.debounceTimeSearchInput)
            .distinctUntilChanged()
            .subscribe(terms => this.search(terms))
    }

    toggleSearch(terms = '') {
        if (0 === terms.length) {
            this.searchEnabled = !this.searchEnabled
        }
    }

    search(terms = '') {
        if (terms.length > 0) {
            this.searchService.changeTerms(terms)
            this.router.navigateByUrl('/search')
        } else {
            this.router.navigateByUrl('/')
        }
    }

    updateSearch(terms = '') {
        this.searchTerms.next(terms)
    }

    listenNetworkState() {
        this.networkStateObserver = this.network.state$.subscribe(connected => this.hasNetworkConnection = connected)
    }
}
