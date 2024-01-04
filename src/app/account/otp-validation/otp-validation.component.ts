import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss']
})
export class OtpValidationComponent {
  constructor(private _formBuilder:FormBuilder, private messageService:MessageService, private _accountService: AccountService, private router:Router){}
  navigateToLoginModalShow=false;
  navigateToLogin(){
    this.navigateToLoginModalShow=false;
    this.router.navigateByUrl('/user/login');
  }
  inProgress: boolean = false;
  form = this._formBuilder.group({
    otp: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
  });
  OnSubmit(){

  }
}
