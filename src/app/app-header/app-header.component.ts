import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
    isAuthenticated: boolean
    name: string
    homePage = false
    searchEnabled: boolean
    @ViewChild('searchInput')
    private searchInput: ElementRef

    constructor(private router: Router) { }

    ngOnInit() {
        this.searchEnabled = false
        this.router
            .events
            .filter(event => event instanceof NavigationEnd)
            .subscribe( (event: NavigationEnd) => this.homePage = '/' !== event.url )
    }

    toggleSearch() {
        if (this.searchInput.nativeElement.value.length === 0) {
            this.searchEnabled = !this.searchEnabled
        }
    }

    goSearch(terms) {
        this.router.navigate(['/search', { terms }])
    }
}
