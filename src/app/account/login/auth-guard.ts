import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.IsLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/user/login'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
    }
}