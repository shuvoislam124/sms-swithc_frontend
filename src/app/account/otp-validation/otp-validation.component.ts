import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { VerifyOtpDto } from '../register/OtpDTO';
import { HttpStatusCode } from '@angular/common/http';
import { SharedService } from 'src/app/components/shared/shared.service';
import { Observable, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss']
})
export class OtpValidationComponent  implements OnInit{
  constructor(
    private _formBuilder:FormBuilder, 
    private messageService:MessageService,
    private _accountService: AccountService,
    private router:Router,
    private accountService:AccountService,
    private _sharedService:SharedService
    ){}
  count =0;
  showCount=true;
  counter=0;
  counterObservable:Observable<any>;
  resend=false;
  makeObservable(number){
    return interval(1000).pipe(
      take(number), // You can adjust the number of times it decreases
      map(() => --number)
    );
  }

  ngOnInit(): void {
    this.counter =  this.getRemainingTime();
    console.log(this.counter);
    if(this.counter<=0){
      this.showCount= false;
      this.resend=true;
    }
    
   const sub= this.makeObservable(this.counter).subscribe((value)=>{
        if(value>0){
          this.count = value;
          console.log(value);
          
        }
        else{
          this.resend=true;
          this.showCount= false;
          sub.unsubscribe();

        }
    })
  }
    getRemainingTime(){
      const storedData:any = JSON.parse(localStorage.getItem('otpDto'));
    
    if (!storedData || !storedData.expirationTime) {
        // Handle the case where the stored data or expiration time is not available
        return null;
    }

    const expireTime:any = new Date(storedData.expirationTime);
    const now:any = new Date();
    const differenceInSeconds = Math.floor((expireTime - now) / 1000);
      console.log(differenceInSeconds);
      return differenceInSeconds
    }
  navigateToLoginModalShow=false;
  navigateToLogin(){
    this.navigateToLoginModalShow=false;
    this.router.navigateByUrl('/user/login');
  }
  inProgress: boolean = false;
  form = this._formBuilder.group({
    enteredOtp: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
  });
  OnSubmit(){
      this.inProgress = true;
      const otpData:VerifyOtpDto = JSON.parse(localStorage.getItem('otpDto'));
      otpData.enteredOtp = this.form.get('enteredOtp').value;
      this.accountService.RegisterationConfirmByOtp(otpData).subscribe((res)=>{
        if(res.statusCode == HttpStatusCode.Ok){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account Created Successfully' });
          localStorage.removeItem('otpDto');
          this.inProgress = false;
          //this.router.navigateByUrl('/user/login');
          setTimeout(()=>{
            this.router.navigateByUrl('/user/login');
          },2000);
        }
        else if(res.statusCode == 400 )
        {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: res.message });
          this.inProgress = false;
        }
        else{
          this.inProgress=false;
          this._sharedService.HandleError(res);

        }
      }
      ,
      (error)=>{
        this._sharedService.HandleError(error);
      })

  }
  resending = false;
  ResendOptForRegestration(){
    if(!this.resending){
      this.resending=true;
    const model:VerifyOtpDto = JSON.parse(localStorage.getItem('otpDto'));
    this._accountService.ResendOtpForRegestration(model).subscribe((res:any)=>{
      if(res.statusCode==200)
      {
        model.expirationTime = res.expirationTime;
        localStorage.setItem('otpDto',JSON.stringify(model));
        this.resending=false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.counter =  this.getRemainingTime();
        console.log(this.counter);
        if(this.counter<=0){
          this.showCount= false;
          this.resend=true;
        }else{
          this.showCount = true;
        }
        
      const sub= this.makeObservable(this.counter).subscribe((value)=>{
            if(value>0){
              this.count = value;
              console.log(value);
              
            }
            else{
              this.resend=true;
              this.showCount= false;
              sub.unsubscribe();

            }
        })
      }
      else if(res.statusCode==204){
        this.messageService.add({severity: 'war', summary: 'Success', detail: res.message});
        this.resending=false;
      }
      else{
        this.resending=false;
      }
    },(error)=>{
      this.resending=false;
      this._sharedService.HandleError(error);
    })
    }
  }
}
