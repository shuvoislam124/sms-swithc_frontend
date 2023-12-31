import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthModel } from "src/app/account/login/auth-model";
import { LoginService } from "src/app/account/login/login.service";
import { RefreshTokenModel } from "src/app/account/login/refresh-token-model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _loginService: LoginService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: AuthModel = JSON.parse(<string>localStorage.getItem('Token'));

    if (!token) {
      return next.handle(req);
    }

    const req1 = AuthInterceptor.AddTokenHeader(req, token.token);

    return next.handle(req1).pipe(catchError((error: any) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(req, next, token);
      }
      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, oldToken: AuthModel) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      let token: RefreshTokenModel = {
        actualToken: oldToken.token,
        refreshToken: oldToken.refreshToken
      };
      if (token)
        return this._loginService.RefreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            if (!token.value)
              return throwError({ status: 401 });
            localStorage.setItem('Token', JSON.stringify(token.value));
            return next.handle(AuthInterceptor.AddTokenHeader(request, token.value.token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.router.navigate(['userr/login']);
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(AuthInterceptor.AddTokenHeader(request, token.value.token)))
    );
  }

  private static AddTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}

