import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class PriceAndCoverageService {
  controller = 'Pricing';
  constructor(private _httpClient:HttpClient) { }
  getAllPriceCoverages() {
    return this._httpClient.get<any>('assets/demo/data/priceAndCoverages.json')
        .toPromise()
        .then(res => res.data as any[])
        .then(data => data);
 }
 GetNonMaskingPrice(){
  return this._httpClient.get(apiUrl+this.controller+'/per-sms/non-masking/logged-in-user');
 }
}
