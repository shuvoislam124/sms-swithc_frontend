import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
@Injectable()
export class MessagingAuthGuard implements CanActivate{
    constructor( private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const fullName = JSON.parse(localStorage.getItem('Token') ?? '')['fullName']
        if (fullName!=null) {
            return true;
        } else {
            this.router.navigate(['/messaging/comoplete_profile'], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
    }
}