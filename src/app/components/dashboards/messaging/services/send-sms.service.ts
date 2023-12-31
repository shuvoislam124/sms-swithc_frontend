import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class SendSmsService {
  senderIdsUrl = apiUrl+'MessageSender/all';
  addMessageUrl = apiUrl+'SendMessage/add'
  constructor(private _httpClient:HttpClient) { }
  getSenderIds(){
    return this._httpClient.get<any>(this.senderIdsUrl);
  }
  addMessage(messageViewModel:any)
  {
    return this._httpClient.post<any>(this.addMessageUrl,messageViewModel);
  }
  addMessageByContactGroups(model:any)
  {
    return this._httpClient.post<any>(apiUrl+'SendMessage/add-by-group',model);
  }
}
