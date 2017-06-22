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

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        const id = parseInt(route.params['id'], 10)

        try {
            const user = this.user.find({ id })

            if (user) {
                return Promise.resolve(user)
            } else {
                this.router.navigate(['/404'])

                return Promise.resolve(null)
            }
        } catch (error) {
            this.router.navigate(['/404'])

            return Promise.resolve(null)
        }
    }
}
