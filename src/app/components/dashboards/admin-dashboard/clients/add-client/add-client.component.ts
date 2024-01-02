import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { ClientsService } from '../clients.service';
import { MessageService } from 'primeng/api';
import { HttpStatusCode } from '@angular/common/http';
import { SharedService } from 'src/app/components/shared/shared.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {
 
  constructor(
    private _accountService:AccountService, 
    public _service:ClientsService,
    private _sharedService:SharedService,
    private messageService:MessageService 
    ) {
    
    
  }
  inProgress: boolean = false;
  
  IfPhoneNumberExist(){
    console.log(this._service.form.get('password')?.value);
    if(this._service.form.get('phoneNumber')?.value !=null){
      this._accountService.IfPhoneNumberExist(null,this._service.form.get('phoneNumber')?.value)
      .subscribe((res)=>{
        console.log(res);
        if(res.value==true){
          this._service.form.get('phoneNumber')?.setErrors({'exists':true})
        }
      })
    }
  }
  
  OnSubmit(){
    console.log(this._service.form.get('phoneNumber')?.value);
    if(this._service.form.valid){
      this.inProgress=true;
      this._accountService.RegisterUser(this._service.form?.value).subscribe((res)=>{
        if(res.statusCode = HttpStatusCode.Ok)
        {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account Created Successfully' });
          this.inProgress = false;
          this._service.displayModal = false;
          this._service.modified = true;
          
        }
      },
      (error)=>{
        this._sharedService.HandleError(error);
        this.inProgress = false;
      }
      )
      
    }
    this._service.modified = true;
  }
}
