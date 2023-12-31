import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DlrScheduledUpcomingComponent } from './dlr-scheduled/dlr-scheduled-upcoming/dlr-scheduled-upcoming.component';
import { DlrScheduledSentComponent } from './dlr-scheduled/dlr-scheduled-sent/dlr-scheduled-sent.component';
import { DlrAdminPanelComponent } from './dlr-admin-panel/dlr-admin-panel.component';
import { SmsStatisticsComponent } from './sms-statistics/sms-statistics.component';

const routes: Routes = [
  {path:'dlr_scheduled/upcoming', component:DlrScheduledUpcomingComponent},
  {path:'dlr_scheduled/sent', component:DlrScheduledSentComponent},
  {path:'dlr_admin_panel', component:DlrAdminPanelComponent},
  {path:'sms_statistics', component:SmsStatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
