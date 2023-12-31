import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiUrl } from 'src/main';
import { RefreshTokenModel } from './refresh-token-model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl:string = apiUrl+'Accounts/Login';
  refreshTokenUrl: string = apiUrl + 'Accounts/refresh-token';
  constructor(private _httpClient: HttpClient, private _router: Router) { }
  Login(data:any){
    return this._httpClient.post<any>(this.loginUrl, data);
  }
  IsLoggedIn(){
    return !!localStorage.getItem('Token');
  }
  RefreshToken(data: RefreshTokenModel){
    return this._httpClient.post<any>(this.refreshTokenUrl,data);
  }

  
}
