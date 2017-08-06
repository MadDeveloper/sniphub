import { Component, OnInit } from '@angular/core'
import { RequestService } from '../services/request.service'
import { Request } from '../interfaces/request'
import { SnippetService } from '../../snippet/services/snippet.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'

@Component({
  selector: 'app-snippets-requests',
  templateUrl: './snippets-requests.component.html',
  styleUrls: ['./snippets-requests.component.scss']
})
export class SnippetsRequestsComponent implements OnInit {
    requests: Observable<Request[]>

    constructor(
        private request: RequestService,
        private snippet: SnippetService,
        private authentication: AuthenticationService,
        private router: Router) { }

    ngOnInit() {
        this.loadRequests()
    }

    loadRequests() {
        this.requests = this.request.all(this.authentication.currentUser())
    }

    seeRequest(request: Request, snippet: Snippet, event: Event) {
        event.preventDefault()
        this.request.storedSnippet = snippet
        this.router.navigate([`/requests/${request.id}`])
    }
}
