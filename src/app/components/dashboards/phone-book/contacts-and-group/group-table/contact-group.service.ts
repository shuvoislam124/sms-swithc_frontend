import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ContactGroupService {
  displayModal  = false;
  modified= false;
  lastTableLazyLoadEvent?:LazyLoadEvent;
  controller = 'ContactGroup';
  addUrl = apiUrl+'ContactGroup/'+'add';
  getAllUrl = apiUrl+'ContactGroup/all';
  updateUrl = apiUrl+'ContactGroup/update';
  deleteUrl = apiUrl+'ContactGroup/delete/'
  constructor(
    private _httpClient:HttpClient,
    private _formsBuilder:FormBuilder
    ){}

  form = this._formsBuilder.group({
    id:null,
    name:['', Validators.required]
  })
  Populate(model: any) {
    this.form.patchValue({
      id: model.id,
      name: model.name
    });
    
  }
  Add(data: any) {
    const model: any = {
      name: data.name,
    };
    return this._httpClient.post<any>(this.addUrl, model);
  }
  Update(data: any) {
    return this._httpClient.put<any>(this.updateUrl, data)
  }
  Delete(id:number){
    return this._httpClient.delete<any>(this.deleteUrl + id);
  }
  GetAll(event?:LazyLoadEvent){
    if(event==null || event ===undefined){
      return this._httpClient.get<any>(this.getAllUrl);
    }
    return this._httpClient.post(this.getAllUrl,event);
  }
  Init(){
    this.form.reset();
    this.form.patchValue({
      id:null,
      name:null
    })
  }
}
