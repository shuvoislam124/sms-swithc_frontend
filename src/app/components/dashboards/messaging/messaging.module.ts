import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagingRoutingModule } from './messaging-routing.module';
import { SendMessageComponent } from './send-message/send-message.component';
import { SendDynamicMessageComponent } from './send-dynamic-message/send-dynamic-message.component';
import { SendMessageBigFileComponent } from './send-message-big-file/send-message-big-file.component';
import { CampaignComponent } from './campaign/campaign.component';
import { SenderIdComponent } from './sender-id/sender-id.component';
import { TemplatesComponent } from './templates/templates.component';
import { InboxComponent } from './inbox/inbox.component';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';
import { KnobModule } from 'primeng/knob';
import { InputSwitchModule } from 'primeng/inputswitch';

import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccountCompletingStepsComponent } from './account-completing-steps/account-completing-steps.component';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { NumberValidatorDirective } from 'src/app/shared/directives/number-validator.directive';
import { NumericOnlyDirective } from 'src/app/shared/directives/numeric-only.directive';
import { GroupContactMessageComponent } from './send-message/group-contact-message/group-contact-message.component';

@NgModule({
  declarations: [
    SendMessageComponent,
    SendDynamicMessageComponent,
    SendMessageBigFileComponent,
    CampaignComponent,
    SenderIdComponent,
    TemplatesComponent,
    InboxComponent,
    AccountCompletingStepsComponent,
    GroupContactMessageComponent,
	
  ],
  imports: [
    CommonModule,
    MessagingRoutingModule,
	NumericOnlyDirective,
	TableModule,
	FileUploadModule,
    TabViewModule,
	NumberValidatorDirective,
    FormsModule,
	TabViewModule,
	CalendarModule,
	TabMenuModule,
	DialogModule,
	StepsModule,
	ToastModule,
	ReactiveFormsModule,
	AutoCompleteModule,
	SplitButtonModule,
	ChipsModule,
	DropdownModule,
	InputMaskModule,
	InputNumberModule,
	CascadeSelectModule,
	MultiSelectModule,
	ToggleButtonModule,
	SliderModule,
	InputTextareaModule,
	RadioButtonModule,
	InputTextModule,
	RatingModule,
	ChipModule,
	KnobModule,
	InputSwitchModule,
	ListboxModule,
	SelectButtonModule,
	CheckboxModule,
	ButtonModule,
	
  ]
})
export class MessagingModule { }
