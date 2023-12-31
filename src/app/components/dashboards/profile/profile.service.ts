import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { changePassworModel } from './models';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  controller = 'Accounts/'
  constructor(private _httpClient:HttpClient) { }
  changePassword(model:any)
  {
    return this._httpClient.post(apiUrl+this.controller+'change-password', model)
  }
}
