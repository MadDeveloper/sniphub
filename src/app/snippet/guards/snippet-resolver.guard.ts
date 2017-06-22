import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Snippet } from '../interfaces/snippet'
import { SnippetService } from '../services/snippet.service'

@Injectable()
export class SnippetResolverGuard implements Resolve<Snippet>  {
    constructor(
        private snippet: SnippetService,
        private router: Router) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Snippet> {
        const id = parseInt(route.params['id'], 10)

        try {
            const snippet = await this.snippet.find({ id })

            if (snippet) {
                return Promise.resolve(snippet)
            }

            this.router.navigate(['/404'])

            return Promise.resolve(null)
        } catch (error) {
            this.router.navigate(['/404'])

            return Promise.resolve(null)
        }
    }
}
