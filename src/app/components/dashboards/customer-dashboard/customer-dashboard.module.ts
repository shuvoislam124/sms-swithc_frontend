import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard.component';
import { MenuModule } from 'primeng/menu';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaymentModule } from '../payment/payment.module';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    MenuModule,
    TimelineModule,
    ButtonModule,
    RippleModule,
    TableModule,
    ChartModule,
    OverlayPanelModule,
    CardModule,
    InputTextModule,
    FormsModule,
    PaymentModule,
    ToastModule
  ]
})
export class CustomerDashboardModule { }
