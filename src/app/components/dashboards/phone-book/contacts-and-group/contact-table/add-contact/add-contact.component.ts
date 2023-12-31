import { Component, Input, OnInit } from '@angular/core';
import { ContactGroupService } from '../../group-table/contact-group.service';
import { SharedService } from 'src/app/components/shared/shared.service';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { ContactService } from '../contact.service';
import { AddOrUpdateContactViewModel } from '../add-or-update-contact-model';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit{
  @Input() groupId:number;
  inProgress = false;
    statusOptions:any[]=[
      {name:"Enable", value:true},
      {name:"Disable",value:false}
  ];
  groups:any[];
  constructor(
    public _service:ContactService,
    private _sharedService:SharedService,
    private _httpClient:HttpClient,
    private _contactGroupService:ContactGroupService
    ){}
  ngOnInit(): void {
    this._contactGroupService.GetAll().subscribe((res)=>{
      this.groups = res.value;
    })
  }
    onSubmit(){
        if(this._service.form.valid){
          if(this._service.form.get('id')?.value ==null){
            this.inProgress = true;
            //const group:any = this._service.form.get('group').value
            const addOrUpdateModel: AddOrUpdateContactViewModel ={
              id: this._service.form.get('id').value,
              number: this._service.form.get('number').value,
              name:  this._service.form.get('name').value,
              email: this._service.form.get('email').value,
              isEnable: this._service.form.get('isEnable').value,
              contactGroupId:this.groupId
            }
            this._service.Add(addOrUpdateModel).subscribe(
              (response: any) => {
                // console.log(response);           
                if (response.statusCode === HttpStatusCode.Ok) {
                  this._sharedService.showSuccess(response.message, 'Saved');
                  this._service.modified = true;
                  
                } else
                  this._sharedService.HandleSuccessMessage(response);
                this._service.displayModal = false;
                this.inProgress = false;
              },
              (error: any) => {
                console.log(error);
                this._sharedService.HandleError(error);
                this.inProgress = false;
              }
            );
          } else {
            this.inProgress = true;
            this._service.Update(this._service.form.value ).subscribe(
              response => {
                if (response.statusCode === HttpStatusCode.Ok) {
                  this._sharedService.showSuccess(response.message, 'Updated');
                  this._service.modified = true;
                  
                  console.log("Hello Updated ");
                } else
                  this._sharedService.HandleSuccessMessage(response);
    
                this._service.displayModal = false;
                this.inProgress = false;
              },
              (error: any) => {
                this._sharedService.HandleError(error);
                this.inProgress = false;
              }
            )
            }
          }
          this._service.form.markAllAsTouched();
          return;
    }
    onCancel(){
      this._service.displayModal = false;
       this._service.Init();
    }
}
