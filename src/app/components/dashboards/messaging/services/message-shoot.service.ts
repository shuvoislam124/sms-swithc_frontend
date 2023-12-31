import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class MessageShootService {
  controller = 'MessageShoot/';
  constructor(private _httpClient:HttpClient) { }
  getTodaysTotalShoot(){
    return this._httpClient.get<any>(apiUrl+this.controller+'todays_total_shoot');
  }
}
