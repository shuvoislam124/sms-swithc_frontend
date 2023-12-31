import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactsAndGroupComponent } from "./contacts-and-group/contacts-and-group.component";
import { ContactComponent } from "src/app/demo/components/pages/contact/contact.component";
import { ContactTableComponent } from "./contacts-and-group/contact-table/contact-table.component";

const routes:Routes = [
    {path:'groups', data:{breadcrumb:'Group'}, component:ContactsAndGroupComponent},
    {path:'group/:name/:id', data:{breadcrumb:'Group'}, component:ContactTableComponent}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers:[]

})
export class PhoneBookRoutingModule{

}