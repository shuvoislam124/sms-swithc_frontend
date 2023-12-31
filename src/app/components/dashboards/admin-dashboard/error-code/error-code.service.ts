import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { apiUrl } from 'src/main';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorCodeService {
  displayModal = false;
  modified = false;
  lastTableLazyLoadEvent?:LazyLoadEvent;
  controller='ErrorCode/';
  addUrl = apiUrl+this.controller+'add';
  updateUrl =apiUrl+this.controller+'update';
  getAllUrl = apiUrl+this.controller+'all';
  deleteUrl = apiUrl+this.controller+'delete/';
  
  constructor(
    private _httpClient:HttpClient,
    private _formsBuilder: FormBuilder
    
    ) { }
    form = this._formsBuilder.group({
      id:null,
      code: [null, Validators.required],
      displayCode: [null, Validators.required],
      description: [null, Validators.required],
      retry: [false]
    })
    Populate(model:any){
      this.form.setValue({
        id:model.id,
        code:model.code,
        displayCode:model.displayCode,
        description:model.description,
        retry:model.retry
      })
    }
    Add(data:any){
      const model:any={
        code:data.code,
        displayCode:data.displayCode,
        description:data.description,
        retry:data.retry
      }
      return this._httpClient.post<any>(this.addUrl,model);
    }
    Update(data: any) {
      return this._httpClient.put<any>(this.updateUrl, data)
    }
    Delete(id:number){
      return this._httpClient.delete<any>(this.deleteUrl + id);
    }
    getAll(event?:LazyLoadEvent){
      if(event==null || event ===undefined){
        return this._httpClient.post(this.getAllUrl,event);
      }
      return this._httpClient.post(this.getAllUrl,event);
    }
    Init(){
      this.form.reset();
      this.form.setValue({
        id:null,
        code: null,
        displayCode: null,
        description: null,
        retry: null
      })
    }
    getAllByGetMethod(){
      return this._httpClient.get(this.getAllUrl);
    }
}
