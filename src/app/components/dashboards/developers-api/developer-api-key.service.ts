import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class DeveloperApiKeyService {
  controller = 'APIKey';
  keyModified = false;
  showModal = false;
  constructor(private _httpClient:HttpClient) { }
  GetCurrentUserApiKey(){
    return this._httpClient.get(apiUrl+this.controller+'/current-user-key');
  }
  GenerateKey(){
    return this._httpClient.get(apiUrl+this.controller+'/create-or-update');
  }
}
