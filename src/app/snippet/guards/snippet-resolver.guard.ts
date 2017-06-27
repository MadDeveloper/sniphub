import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Snippet } from '../interfaces/snippet'
import { SnippetService } from '../services/snippet.service'
import { Observable } from 'rxjs'

@Injectable()
export class SnippetResolverGuard implements Resolve<Snippet>  {
    constructor(
        private snippet: SnippetService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Snippet> {
        // try {
        //     const id = route.params['id']
        //     const snippet = await this.snippet.find(id).take(1).toPromise()

        //     if (snippet) {
        //         return Promise.resolve(snippet)
        //     }

        //     return this.resolveFails()
        // } catch (error) {
        //     console.log(error)
        //     return this.resolveFails()
        // }
        const id = route.params['id']

        return this
            .snippet
            .findAsSnapshot(id)
            .map((snippet: Snippet): Snippet => {
                if (snippet) {
                    return snippet
                }

                this.router.navigate(['/404'])

                return null
            })
            .take(1)
    }

    resolveFails(): Promise<any> {
        this.router.navigate(['/404'])

        return Promise.resolve(null)
    }
}
