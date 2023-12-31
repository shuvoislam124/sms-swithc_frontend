import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { BuyCreditComponent } from './buy-credit/buy-credit.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  declarations: [
    TransactionHistoryComponent,
    BuyCreditComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    TableModule,
    DropdownModule,
    SplitButtonModule
  ]
})
export class PaymentModule { }
