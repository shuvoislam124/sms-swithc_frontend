import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { BuyCreditComponent } from './buy-credit/buy-credit.component';

const routes: Routes = [
  {path:'transaction_history', data:{breadcrumb:'Transaction History'}, component:TransactionHistoryComponent},
  {path:'buy_credit', data:{bradcrumb:'Buy Credit'}, component:BuyCreditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
