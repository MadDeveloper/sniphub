import { Component, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { Router } from '@angular/router'
import { SnippetService } from 'app/services/snippet/snippet.service'
import { Snippet } from 'app/interfaces/snippet'
import { AuthenticationService } from 'app/services/authentication/authentication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    filter = 'Snippet'
    snippets: Snippet[]

    constructor(
        private router: Router,
        private snippetService: SnippetService,
        private authentication: AuthenticationService) { }

    ngOnInit() {
        this.snippets = this.snippetService.all()
    }

    changeFilter(filter: string, event: Event) {
        this.filter = filter
        event.preventDefault()
    }

    focusSearchInput(event: Event) {
        $(event.target).next().focus()
    }

}
