import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { AuthenticationService } from '../../authentication/services/authentication.service'

@Injectable()
export class ProfileCompletedGuard implements CanActivate {
    constructor(
        private authentication: AuthenticationService,
        private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authentication.logged) {
            return true
        }

        if (!this.authentication.user.username) {
            this.router.navigateByUrl('/profile/ask-username')

            return false
        }

        return true
    }
}
