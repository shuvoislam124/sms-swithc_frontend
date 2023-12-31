import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class BkashService {
  addBalanceUrl = apiUrl+'BKashPGW/add-balance';
  availableBalanceUrl = apiUrl+'Accounts/available-balance/'
  constructor(private _httpClient:HttpClient)
  { 

  }
  addBalance(amount:string):Observable<string>{
    let phoneNumber=  JSON.parse(localStorage.getItem('Token'))['phoneNumber'];
    return this._httpClient.post<any>(this.addBalanceUrl, {phoneNumber:phoneNumber,amount:amount});
  }
  getAvailableBalanceAmount(){
    
    return this._httpClient.get<any>(this.availableBalanceUrl+JSON.parse(localStorage.getItem('Token'))['phoneNumber']);
  }
}
