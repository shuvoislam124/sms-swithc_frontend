import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class SmsStatisticsService {
  displayModal = false;
  modified = false;
  lastTableLazyLoadEvent?:LazyLoadEvent;
  controller = 'SmsStatistics/';
  getAllUrl: string = apiUrl + this.controller + 'getall';
  constructor(private _httpClient:HttpClient) { }
  
  GetAll(event?: LazyLoadEvent, startDate?:any, endDate?:any) {
      if(startDate && endDate)
      {
        return this._httpClient.post<any>(this.getAllUrl+`?startDate=${startDate}&endDate=${endDate}`, event);
      } 
      return this._httpClient.post<any>(this.getAllUrl, event);
  }
  DownloadReport(phoneNumber:string,smsSendingProcedureType:string, startDate?:string,endDate?:string)
  {
     if(startDate && endDate){
      return this._httpClient.get(apiUrl+ this.controller+`userReport/${phoneNumber}/${smsSendingProcedureType}?startDate=${startDate}&endDate=${endDate}`, { responseType: 'blob' });
     }
     return this._httpClient.get(apiUrl+ this.controller+`userReport/${phoneNumber}/${smsSendingProcedureType}`, { responseType: 'blob' });
  }
}
