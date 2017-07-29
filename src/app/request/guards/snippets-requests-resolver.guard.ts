import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { RequestService } from '../../request/services/request.service'
import { SnippetService } from '../../snippet/services/snippet.service'
import { AuthenticationService } from '../../authentication/services/authentication.service'
import { Snippet } from '../../snippet/interfaces/snippet'
import { Request } from '../interfaces/request'

@Injectable()
export class SnippetsRequestsResolverGuard implements Resolve<Observable<Request[]>> {
    constructor(
        private request: RequestService,
        private router: Router,
        private snippet: SnippetService,
        private authentication: AuthenticationService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this
            .snippet
            .author(this.authentication.currentUser())
            .mergeMap((snippets: Snippet[]) => snippets.map((snippet: Snippet) => this.request.forSnippet(snippet)))
            .mergeAll()
            .first()
    }
}
