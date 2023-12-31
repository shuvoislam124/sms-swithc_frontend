import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceAndCoverageService {

  constructor(private _httpClient:HttpClient) { }
  getAllPriceCoverages() {
    return this._httpClient.get<any>('assets/demo/data/priceAndCoverages.json')
        .toPromise()
        .then(res => res.data as any[])
        .then(data => data);
}
}
