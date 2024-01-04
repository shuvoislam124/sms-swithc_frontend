import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent } from './register/register.component';
import {LoginComponent} from './login/login.component';
import { CommonModule } from '@angular/common';
import { OtpValidationComponent } from './otp-validation/otp-validation.component';
const routes:Routes=[
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'confirm_account', component:OtpValidationComponent}
]
@NgModule({
    declarations:[],
    imports:[CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule{
    
}