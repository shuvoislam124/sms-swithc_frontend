import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorCodeRoutingModule } from './error-code-routing.module';
import { CreateErrorCodeComponent } from './create-error-code/create-error-code.component';
import { ErrorCodeListComponent } from './error-code-list/error-code-list.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorCodeComponent } from './error-code.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import { BadgeModule } from 'primeng/badge';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    CreateErrorCodeComponent,
    ErrorCodeListComponent,
    ErrorCodeComponent
  ],
  imports: [
    CommonModule,
    ErrorCodeRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule, 
    DialogModule,
    RadioButtonModule,
    BadgeModule,
    SelectButtonModule

  ]
})
export class ErrorCodeModule { }
