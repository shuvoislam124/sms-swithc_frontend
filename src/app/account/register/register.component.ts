import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _formBuilder:FormBuilder, private messageService:MessageService, private _accountService: AccountService, private router:Router){}
  inProgress: boolean = false;
  form = this._formBuilder.group({
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
   
  });
  IfPhoneNumberExist(){
    console.log(this.form.get('password')?.value);
    if(this.form.get('phoneNumber')?.value !=null){
      this._accountService.IfPhoneNumberExist(null,this.form.get('phoneNumber')?.value)
      .subscribe((res)=>{
        console.log(res);
        if(res.value==true){
          this.form.get('phoneNumber')?.setErrors({'exists':true})
        }
      })
    }
  }
  navigateToLoginModalShow=false;
  OnSubmit(){
    console.log(this.form.get('phoneNumber')?.value);
    if(this.form.valid){
      this.inProgress=true;
      this._accountService.RegisterUser(this.form?.value).subscribe((res)=>{
        if(res.statusCode = HttpStatusCode.Ok)
        {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account Created Successfully' });
          this.navigateToLoginModalShow=true;
        }
      })

      
    }

  }
  navigateToLogin(){
    this.navigateToLoginModalShow=false;
    this.router.navigateByUrl('/user/login');
  
  }
}
