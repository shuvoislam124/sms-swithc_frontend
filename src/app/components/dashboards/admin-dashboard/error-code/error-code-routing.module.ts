import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateErrorCodeComponent } from './create-error-code/create-error-code.component';
import { ErrorCodeListComponent } from './error-code-list/error-code-list.component';
import { ErrorCodeComponent } from './error-code.component';

const routes: Routes = [
  {path:'', component:ErrorCodeComponent},
  {path:'list', component:ErrorCodeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorCodeRoutingModule { }
