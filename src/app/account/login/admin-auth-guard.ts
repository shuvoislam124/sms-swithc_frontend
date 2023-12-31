import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";

@Injectable()
export class AdminAuthGuard implements CanActivate, CanActivateChild {

    constructor(private loginService: LoginService, private router: Router) {
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.IsLoggedIn()) {
            let userRole = JSON.parse(localStorage.getItem('Token')).roles;
            //console.log(userRole);
            console.log(userRole.includes("Admin"));
            if(userRole.includes("Admin"))
                return true;
            this.router.navigate(['/user/login'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        } else {
            this.router.navigate(['/user/login'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loginService.IsLoggedIn()) {
            let userRole = JSON.parse(localStorage.getItem('Token')).roles;
            //console.log(userRole);
            console.log(userRole.includes("Admin"));
            if(userRole.includes("Admin"))
                return true;
            this.router.navigate(['/user/login'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
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