import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { AdminAuthGuard } from "src/app/account/login/admin-auth-guard";
import { ClientsComponent } from "./clients/clients.component";
import { ClientComponent } from "./clients/client/client.component";

@NgModule({
    imports:[RouterModule.forChild([
        {path:'', component:AdminDashboardComponent, canActivate:[AdminAuthGuard]},
        {path:'error_code', loadChildren:()=>import('./error-code/error-code.module').then(m=>m.ErrorCodeModule), canActivateChild:[AdminAuthGuard]},
        {path:'clients', component:ClientsComponent, canActivate:[AdminAuthGuard]},
        {path:'client/:id', component:ClientComponent,canActivate:[AdminAuthGuard]}
    ])],
    exports:[RouterModule]
})
export class AdminDashboardRoutingModule{

}