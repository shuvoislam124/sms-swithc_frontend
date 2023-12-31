import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsAndGroupComponent } from './contacts-and-group/contacts-and-group.component';
import { PhoneBookRoutingModule } from './phone-book-routing.module';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { GroupTableComponent } from './contacts-and-group/group-table/group-table.component';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddContactGroupComponent } from './contacts-and-group/group-table/add-contact-group/add-contact-group.component';
import { ContactTableComponent } from './contacts-and-group/contact-table/contact-table.component';
import { AddContactComponent } from './contacts-and-group/contact-table/add-contact/add-contact.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { NumericOnlyDirective } from 'src/app/shared/directives/numeric-only.directive';
import { ImportContactComponent } from './contacts-and-group/contact-table/import-contact/import-contact.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [
    ContactsAndGroupComponent,
    GroupTableComponent,
    AddContactGroupComponent,
    ContactTableComponent,
    AddContactComponent,
    ImportContactComponent
  ],
  imports: [
    CommonModule,
    PhoneBookRoutingModule,
    TabViewModule,
    TableModule,
    MultiSelectModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    NumericOnlyDirective
  ]
})
export class PhoneBookModule { }
