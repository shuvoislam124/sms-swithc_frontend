import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { DevelopersApiComponent } from './developers-api/developers-api.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ProfileComponent } from './profile/profile.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    DevelopersApiComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    TableModule,
    DialogModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule
  ],
  exports:[]
})
export class DashboardsModule { }
