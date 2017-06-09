import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { RequestService } from '../../services/request/index'
import { Location } from '@angular/common'
import { Request } from '../../interfaces/request/index'

@Injectable()
export class SnippetRequestResolverGuard implements Resolve<Request> {
    constructor(
        private request: RequestService,
        private location: Location) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Request> {
        const id = parseInt(route.params['id'], 10)

        const request = await this.request.find({ id })

        if (request) {
            return Promise.resolve(request)
        }

        this.location.back() // todo: redirect to specific 404 view

        return Promise.resolve(null)
    }
}
