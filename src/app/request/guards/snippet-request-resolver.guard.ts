import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { RequestService } from '../../request/services/request.service'
import { Request } from '../interfaces/request'

@Injectable()
export class SnippetRequestResolverGuard implements Resolve<Request> {
    constructor(
        private request: RequestService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Request> {
        const id = route.params['id']

        return this
            .request
            .find(id, null)
            .map((request: Request): Request => {
                if (request) {
                    return request
                }

                this.router.navigate(['/404'])

                return null
            })
            .take(1)
    }
}
