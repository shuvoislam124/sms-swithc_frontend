import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DevelopersApiComponent } from "./developers-api/developers-api.component";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
    imports:[RouterModule.forChild([
        {path:'admin', loadChildren:()=>import('./admin-dashboard/admin-dashboard.module')
                .then(m=>m.AdminDashboardModule) 
        },
        {path:'profile', data:{breadcurmb:'Profile'}, component: ProfileComponent },
        {path:'', data:{breadcrumb:'Customer Dashbaord'}, loadChildren:()=>import('./customer-dashboard/customer-dashboard.module')
                                .then(m=>m.CustomerDashboardModule)
        },
        {path:'priceandcoverage', data:{breadcrumb:'Price And Coverage'}, loadComponent:()=>import('./price-and-coverage/price-and-coverage.component').then(mod=>mod.PriceAndCoverageComponent)},
        {path:'phonebook', data:{breadcrumb:'Phone Book'}, loadChildren:()=>import('./phone-book/phone-book.module').then(m=>m.PhoneBookModule)},
        {path:'messaging',data:{breadcrumb:'Messaging'}, loadChildren:()=>import('./messaging/messaging.module').then(m=>m.MessagingModule)},
        {path:'reporting', data:{breadcrumb:'Reporting'}, loadChildren:()=>import('./reporting/reporting.module').then(m=>m.ReportingModule)},
        {path:'developers',data:{breadcrumb:'Develpoers'}, component:DevelopersApiComponent}
    ])],
    exports:[RouterModule]
})
export class DashBoardRoutingModule{

}