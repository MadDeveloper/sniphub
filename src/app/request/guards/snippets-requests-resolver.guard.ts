import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { RequestService } from '../../request/services/request.service'
import { Request } from '../../request/interfaces/request'

@Injectable()
export class SnippetsRequestsResolverGuard implements Resolve<Request[]> {
    constructor(
        private request: RequestService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Request[]> {
        this.router.navigate(['/'])

        return null
    }
}
