import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import * as $ from 'jquery'
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
    lastAddedSnippets: Snippet[] = []
    lastAddedSnippetsObserver: Subscription
    popularSnippets: Snippet[] = []
    popularSnippetsObserver: Subscription
    loading = false

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
        if (this.lastAddedSnippetsObserver) {
            this.lastAddedSnippetsObserver.unsubscribe()
        }

        if (this.popularSnippetsObserver) {
            this.popularSnippetsObserver.unsubscribe()
        }
    }

    loadSnippets() {
        this.enableLoading()
        this.lastAddedSnippetsObserver = this
            .snippetService
            .lastAdded()
            .subscribe((snippets: Snippet[]) => {
                this.lastAddedSnippets = snippets
                this.loadPopularSnippets()
            })
    }

    loadPopularSnippets() {
        this.enableLoading()
        this.popularSnippetsObserver = this
            .snippetService
            .lastAdded()
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
}
