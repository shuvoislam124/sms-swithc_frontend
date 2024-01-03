import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountCompletingStepsComponent } from './account-completing-steps.component';
import { Observable } from 'rxjs';

export const formDeactivateGuard: CanDeactivateFn<AccountCompletingStepsComponent> =
(
    component: AccountCompletingStepsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree  =>
{
    if(component.isUploaded)
        return component.isUploaded;
    component.isVisibleSaveDialog = true;
    return new Promise<boolean>((resolve, reject) => {
      component.ref.onClose.subscribe((result: boolean) => {
        component.isVisibleSaveDialog = false;
        resolve(result);
      });
  });
}