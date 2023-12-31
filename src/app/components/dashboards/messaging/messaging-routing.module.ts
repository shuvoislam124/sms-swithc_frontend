import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './send-message/send-message.component';
import { SendDynamicMessageComponent } from './send-dynamic-message/send-dynamic-message.component';
import { SendMessageBigFileComponent } from './send-message-big-file/send-message-big-file.component';
import { CampaignComponent } from './campaign/campaign.component';
import { SenderIdComponent } from './sender-id/sender-id.component';
import { TemplatesComponent } from './templates/templates.component';
import { InboxComponent } from './inbox/inbox.component';
import { AccountCompletingStepsComponent } from './account-completing-steps/account-completing-steps.component';
import { MessagingAuthGuard } from './messaging-authguard';
import { formDeactivateGuard } from './account-completing-steps/form-deactivate.guard';
import { AuthGuard } from 'src/app/account/login/auth-guard';

const routes: Routes = [
  {path:'sendmessage', data:{breadcrumb:'Send Message'}, component:SendMessageComponent, canActivate:[MessagingAuthGuard, AuthGuard]},
  {path:'senddynamicmessage', data:{breadcrumb:'Send Dynamic Message'}, component:SendDynamicMessageComponent, canActivate:[MessagingAuthGuard, AuthGuard]},
  {path:'sendmessagebigfile', data:{breadcrumb:'Send Message Big File'}, component:SendMessageBigFileComponent, canActivate:[MessagingAuthGuard]},
  {path:'campaign', data:{breadcrumb:'Campaign'}, component:CampaignComponent, canActivate:[MessagingAuthGuard]},
  {path:'senderid', data:{breadcrumb:'Sender Ids'}, component:SenderIdComponent, canActivate:[MessagingAuthGuard]},
  {path:'smstemplates', data:{breadcrumb:'SMS Templates'}, component:TemplatesComponent, canActivate:[MessagingAuthGuard]},
  {path:'inbox',data:{breadcrumb:'Inbox'}, component:InboxComponent , canActivate:[MessagingAuthGuard]},
  {path:'comoplete_profile',data:{breadcrumb:'Profile Completion'},component:AccountCompletingStepsComponent, canDeactivate: [formDeactivateGuard]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[MessagingAuthGuard, AuthGuard]
})
export class MessagingRoutingModule { }
