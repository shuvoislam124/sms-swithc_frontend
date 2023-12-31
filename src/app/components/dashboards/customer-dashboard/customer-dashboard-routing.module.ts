import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard.component';

const routes: Routes = [
  {path:'', component:CustomerDashboardComponent},
  {path:'payment', loadChildren:()=>import('../payment/payment.module').then(m=>m.PaymentModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }
