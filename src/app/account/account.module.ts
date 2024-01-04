import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AccountRoutingModule} from './account-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { AppConfigModule } from '../layout/config/app.config.module';
import { PasswordModule } from 'primeng/password';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { OtpValidationComponent } from './otp-validation/otp-validation.component';
import { NumberValidatorDirective } from '../shared/directives/number-validator.directive';
import { NumericOnlyDirective } from '../shared/directives/numeric-only.directive';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    OtpValidationComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CheckboxModule,
    AppConfigModule,
    RippleModule,
    PasswordModule,
    DialogModule,
    NumericOnlyDirective
    
  ],
  providers:[MessageService, ConfirmationService]
})
export class AccountModule { }
