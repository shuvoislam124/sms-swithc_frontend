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
import { ClientComponent } from './clients/client/client.component';
import { TransactionDashboardComponent } from './transaction-dashboard/transaction-dashboard.component';
import { SmsDashboardComponent } from './sms-dashboard/sms-dashboard.component';
import { OperatorDashboardComponent } from './operator-dashboard/operator-dashboard.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TimelineModule } from 'primeng/timeline';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    ClientsComponent,
    AddClientComponent,
    ClientComponent,
    TransactionDashboardComponent,
    SmsDashboardComponent,
    OperatorDashboardComponent
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
    DialogModule,
    TableModule,
    ProgressBarModule,
    MenuModule,
    RippleModule,
    ChartModule,
    SelectButtonModule,    
    TimelineModule,
    OverlayPanelModule,
    CardModule,
  ]
})
export class AdminDashboardModule { }
