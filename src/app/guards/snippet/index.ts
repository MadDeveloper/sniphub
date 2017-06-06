import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Snippet } from 'app/interfaces/snippet'
import { SnippetService } from 'app/services/snippet/snippet.service'

@Injectable()
export class SnippetResolverGuard implements Resolve<Snippet>  {
    constructor(
        private snippet: SnippetService,
        private location: Location) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Snippet> {
        const id = parseInt(route.params['id'], 10)

        return this
            .snippet
            .find(id)
            .then(snippet => {
                if (snippet) {
                    return snippet
                }

                this.location.back() // todo: redirect to specific 404 view

                return null
            })
            .catch(() => {
                this.location.back() // todo: redirect to specific 404 view

                return null
            })
    }
}
