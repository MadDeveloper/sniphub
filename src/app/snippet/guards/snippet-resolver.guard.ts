import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Snippet } from '../interfaces/snippet'
import { SnippetService } from '../services/snippet.service'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SnippetResolverGuard implements Resolve<Snippet>  {
    constructor(
        private snippet: SnippetService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Snippet> {
        const id = route.params['id']

        return this
            .snippet
            .find(id)
            .first()
            .do((snippet: Snippet) => {
                if (!snippet) {
                    this.router.navigate(['/404'])
                }
            })
    }
}
