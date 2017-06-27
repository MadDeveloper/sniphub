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
        const id = parseInt(route.params['id'], 10)

        try {
            const user = this.user.find('ddDADa13ff42')

            if (user) {
                return user
            } else {
                this.router.navigate(['/404'])

                return null
            }
        } catch (error) {
            this.router.navigate(['/404'])

            return null
        }
    }
}
