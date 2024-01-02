import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddClientComponent } from './clients/add-client/add-client.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ClientsComponent,
    AddClientComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    SplitButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule
  ]
})
export class AdminDashboardModule { }
