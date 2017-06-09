import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { RequestService } from '../../services/request'
import { Location } from '@angular/common'
import { Request } from '../../interfaces/request/index'

@Injectable()
export class SnippetsRequestsResolverGuard implements Resolve<Request[]> {
    constructor(
        private request: RequestService,
        private location: Location) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Request[]> {
        const id = parseInt(route.params['id'], 10)

        const requests = await this.request.all()

        if (requests) {
            return Promise.resolve(requests)
        }

        this.location.back()

        return Promise.resolve(null)
    }
}
