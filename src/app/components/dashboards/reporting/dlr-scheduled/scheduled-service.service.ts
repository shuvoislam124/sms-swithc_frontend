import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ScheduledServiceService {
  displayModal = false;
  modified = false;
  lastTableLazyLoadEvent?:LazyLoadEvent;
  controller = 'DLRScheduled/';
  getAllUrl: string = apiUrl + this.controller + 'getall';
  constructor(private _httpClient:HttpClient) { }
  
  GetAll(event?: LazyLoadEvent) {
    if (event === null || event === undefined)
      //return this._httpClient.get<any>(this.getAllUrl);
      return this._httpClient.post<any>(this.getAllUrl, event);
    else
      return this._httpClient.post<any>(this.getAllUrl, event);
  }
  GetAllForAdmin(event?: LazyLoadEvent) {
    if (event === null || event === undefined)
      //return this._httpClient.get<any>(this.getAllUrl);
      return this._httpClient.post<any>(this.getAllUrl+'/Admin', event);
    else
      return this._httpClient.post<any>(this.getAllUrl+'/Admin', event);
  }
  getAllCampaign(){
    return this._httpClient.get<any>(apiUrl+this.controller+'all_camaping');
  }
  DeleteRecipeintMessageById(id:any)
  {
    return this._httpClient.delete(apiUrl+this.controller+'delete/'+id);
  }
  
}
