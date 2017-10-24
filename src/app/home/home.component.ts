import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Snippet } from '../snippet/interfaces/snippet'
import { SnippetService } from '../snippet/services/snippet.service'
import { AuthenticationService } from '../authentication/services/authentication.service'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    latestAddedSnippets: Snippet[] = []
    latestAddedSnippetsObserver: Subscription
    popularSnippets: Snippet[] = []
    popularSnippetsObserver: Subscription
    loading = false
    activeTab = 'latestAdded'

    constructor(
        private router: Router,
        private snippetService: SnippetService,
        private authentication: AuthenticationService) { }

    ngOnInit() {
        this.loadSnippets()
    }

    ngOnDestroy() {
        this.closeSubscriptions()
    }

    closeSubscriptions() {
        if (this.latestAddedSnippetsObserver) {
            this.latestAddedSnippetsObserver.unsubscribe()
        }

        if (this.popularSnippetsObserver) {
            this.popularSnippetsObserver.unsubscribe()
        }
    }

    loadSnippets() {
        this.enableLoading()
        this.latestAddedSnippetsObserver = this
            .snippetService
            .latestAdded()
            .subscribe((snippets: Snippet[]) => {
                this.latestAddedSnippets = snippets
                this.loadPopularSnippets()
            })
    }

    loadPopularSnippets() {
        this.enableLoading()
        this.popularSnippetsObserver = this
            .snippetService
            .popular()
            .subscribe((snippets: Snippet[]) => {
                this.popularSnippets = snippets
                this.disableLoading()
            })
    }

    enableLoading() {
        this.loading = true
    }

    disableLoading() {
        this.loading = false
    }

    toggleTab(tab: string) {
        switch (tab) {
            case 'latestAdded':
                if (this.latestAddedSnippets.length > 0) {
                    this.activeTab = 'latestAdded'
                }
                break

            default:
                if (this.popularSnippets.length > 0) {
                    this.activeTab = 'popular'
                }
                break
        }
    }
}
