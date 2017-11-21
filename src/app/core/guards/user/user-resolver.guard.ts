import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { UserService } from '../../services/user/user.service'
import { User } from '../../interfaces/user/user'

@Injectable()
export class UserResolverGuard implements Resolve<User> {
    constructor(
        private user: UserService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        const id = route.params['id']

        return this
            .user
            .find(id)
            .map((user: User): User => {
                if (user) {
                    return user
                }

                this.router.navigate(['/404'])

                return null
            })
            .first()
    }
}
