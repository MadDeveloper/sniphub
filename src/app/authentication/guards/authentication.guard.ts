import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { AuthenticationService } from '../services/authentication.service'

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authentication: AuthenticationService,
        private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authentication.logged) {
            return true
        }

        this.authentication.redirectUrl = state.url
        this.router.navigate(['/signin'])

        return false
    }
}
