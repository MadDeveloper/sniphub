import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../services/user/user.service'
import { User } from 'app/interfaces/user'

@Injectable()
export class UserResolverGuard implements Resolve<User> {
    constructor(
        private user: UserService,
        private location: Location) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        const id = parseInt(route.params['id'], 10)

        return this
            .user
            .find({ id })
            .then(user => {
                if (user) {
                    return user
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
