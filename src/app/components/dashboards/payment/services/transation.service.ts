import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class TransationService {
  transactionUrl = apiUrl+'Transaction/';
  controller = 'Transaction/';
  constructor(private _httpClient:HttpClient) { }
  getLatestTransaction(total:number){
    return this._httpClient.get<any>(this.transactionUrl+`latest-transations?userName=${JSON.parse(localStorage.getItem('Token'))['phoneNumber']}&total=${total}`)
  }
  getAllTransactionOfaUser()
  {
    return this._httpClient.get<any>(this.transactionUrl+`all?userName=${JSON.parse(localStorage.getItem('Token'))['phoneNumber']}`)
  }
  getAllTransaction(data:any){
    return this._httpClient.post<any>(apiUrl+this.controller+'all', data);
  }
}
