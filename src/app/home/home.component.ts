import { Component, OnInit } from '@angular/core'
import * as $ from 'jquery'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    filter = 'Snippet'

    constructor(private router: Router) { }

    ngOnInit() { }

    changeFilter(filter: string, event: Event) {
        this.filter = filter
        event.preventDefault()
    }

    snippetDetails(snippetId: number) {
        this.router.navigate([`snippet/${snippetId}`])
    }

    focusSearchInput(event: Event) {
        $(event.target).next().focus()
    }

}
