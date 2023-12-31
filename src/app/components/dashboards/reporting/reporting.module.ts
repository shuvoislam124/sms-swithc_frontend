import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ReportingRoutingModule } from './reporting-routing.module';
import { DlrPanelComponent } from './dlr-panel/dlr-panel.component';
import { DlrApiComponent } from './dlr-api/dlr-api.component';
import { DlrScheduledSentComponent } from './dlr-scheduled/dlr-scheduled-sent/dlr-scheduled-sent.component';
import { DlrScheduledUpcomingComponent } from './dlr-scheduled/dlr-scheduled-upcoming/dlr-scheduled-upcoming.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { DlrAdminPanelComponent } from './dlr-admin-panel/dlr-admin-panel.component';
import { SmsStatisticsComponent } from './sms-statistics/sms-statistics.component';

@NgModule({
  declarations: [
    DlrPanelComponent,
    DlrApiComponent,
    DlrScheduledSentComponent,
    DlrScheduledUpcomingComponent,
    DlrAdminPanelComponent,
    SmsStatisticsComponent,
    
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginatorModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    ProgressBarModule,
    InputTextModule

  ]
})
export class ReportingModule { }
