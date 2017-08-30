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
    lastestAddedSnippets: Snippet[] = []
    lastestAddedSnippetsObserver: Subscription
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
        if (this.lastestAddedSnippetsObserver) {
            this.lastestAddedSnippetsObserver.unsubscribe()
        }

        if (this.popularSnippetsObserver) {
            this.popularSnippetsObserver.unsubscribe()
        }
    }

    loadSnippets() {
        this.enableLoading()
        this.lastestAddedSnippetsObserver = this
            .snippetService
            .lastestAdded()
            .subscribe((snippets: Snippet[]) => {
                this.lastestAddedSnippets = snippets
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
}
