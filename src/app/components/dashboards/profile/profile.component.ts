import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';


function comparePasswords(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  // return null if controls haven't initialized yet
  if (!newPassword || !confirmPassword) {
    return null;
  }

  return newPassword.value === confirmPassword.value ? null : { 'passwordMismatch': true };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private _formsBuilder: FormBuilder,
              private _profileService:ProfileService,
              private _sharedService:SharedService
              ){}
  ngOnInit(): void {
    this.changePasswordForm = this._formsBuilder.group({
      oldPassword:['',Validators.required],
      newPassword:['',Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword:['',Validators.required]
    },
    {Validators:comparePasswords})
  }
  changePasswordForm!:FormGroup;

  onSumbmitChangePasswordForm()
  {
    if(this.changePasswordForm.valid)
    {
      const model={
        phoneNumber:JSON.parse(localStorage.getItem('Token')).phoneNumber,
        oldPassword:this.changePasswordForm.get('oldPassword').value,
        newPassword:this.changePasswordForm.get('newPassword').value
      }
      console.log(model);
      this._profileService.changePassword(model).subscribe({
        next:(response:any)=>{
          if(response.statusCode == HttpStatusCode.Ok)
              this._sharedService.showSuccess('Your Password has been Change sucessfully');
              
        },
        error:(error)=>{
          this._sharedService.HandleError(error);
        }
      })
      
    }
  }
  
}
