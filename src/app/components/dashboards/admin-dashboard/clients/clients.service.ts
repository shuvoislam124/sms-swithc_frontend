import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  displayModal = false;
  modified = false;
  lastTableLazyLoadEvent?:LazyLoadEvent;
  controller = 'Accounts/';
  getAllUrl: string = apiUrl + this.controller + 'getall';
  constructor(private _httpClient:HttpClient,
    private _formsBuilder:FormBuilder) { }
  form = this._formsBuilder.group({
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
  })
  GetAll(event?: LazyLoadEvent) {
    if (event === null || event === undefined)
      return this._httpClient.get<any>(this.getAllUrl);
    else
      return this._httpClient.post<any>(this.getAllUrl, event);
  }
  
  Init(){
    this.form.reset();
    this.form.patchValue({
      password:null,
      phoneNumber:null
    })
  }

}
