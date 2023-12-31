import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { numberValidator } from 'src/app/shared/directives/number-validator.directive';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  displayModal  = false;
  displayImportModal = false;
  modified= false;
  lastTableLazyLoadEvent?:LazyLoadEvent;
  controller = 'ContactGroup';
  addUrl = apiUrl+'Contact/'+'add';
  getAllUrl = apiUrl+'Contact/all';
  updateUrl = apiUrl+'Contact/update';
  deleteUrl = apiUrl+'Contact/delete/';
  importByFormUrl=apiUrl+'Contact/importbyform'
  constructor(
    private _httpClient:HttpClient,
    private _formsBuilder:FormBuilder
    ){}
  form = this._formsBuilder.group({
    id:null,
    number: ['', Validators.compose([Validators.required, Validators.minLength(13)])],
    name: [null],
    email: [''],
    isEnable: [true,Validators.required],
  });
  
  importform:FormGroup= this._formsBuilder.group({
    numbers:['', [Validators.required, numberValidator()]],
  });
  uploadCsvForm = this._formsBuilder.group({
    file:[null,Validators.required]
  });
  uploadExcelForm:FormGroup= this._formsBuilder.group({
    file:[null, Validators.required]
  })

  Populate(model: any) {
    this.form.patchValue({
      id: model.id,
      name: model.name,
      number:model.number,
      email:model.email,
      isEnable:model.isEnable
    });
  }
  Add(data: any) {
    
    return this._httpClient.post<any>(this.addUrl, data);
  }
  ImportByForm(data:any){
    return this._httpClient.post<any>(this.importByFormUrl,data);
  }
  Update(data: any) {
    return this._httpClient.put<any>(this.updateUrl, data)
  }
  Delete(id:number){
    return this._httpClient.delete<any>(this.deleteUrl + id);
  }
  GetAll(event?:LazyLoadEvent,id?:any){
    if(event==null || event ===undefined){
      return this._httpClient.get<any>(this.getAllUrl);
    }
    return this._httpClient.post(this.getAllUrl+`?groupId=${id}`,event);
  }
  Init(){
    this.form.reset();
    this.importform.reset();
  }
  
}
