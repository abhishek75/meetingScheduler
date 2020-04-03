import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService } from '@app/core/alert/alert.service';
import { AuthenticationService } from '@app/core/auth/auth.service';
import { JwtAuthService } from '../services/jwt-token/jwt-auth.service';


@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private jwtTokenService: JwtAuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userStatus = this.jwtTokenService.getToken();
        if (userStatus) {
            // User is logged in so prevent user from going to login page again.
            this.router.navigate(['/home']);
            return false;
        }
        // not logged in
        return true;
    }
}
