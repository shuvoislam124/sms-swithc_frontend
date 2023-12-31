import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendSmsService } from '../../services/send-sms.service';
import { SharedService } from 'src/app/components/shared/shared.service';
import { AccountService } from 'src/app/account/services/account.service';
import { Observable, asyncScheduler, observeOn } from 'rxjs';
import { numberValidator } from 'src/app/shared/directives/number-validator.directive';
import { HttpStatusCode } from '@angular/common/http';
import { ContactGroupService } from '../../../phone-book/contacts-and-group/group-table/contact-group.service';
import { co } from '@fullcalendar/core/internal-common';

function getFormattedTime() {
  const currentDate = new Date();

  // Extract hours and minutes components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Ensure leading zeros for single-digit hours and minutes
  const formattedHours = (hours < 10) ? '0' + hours : hours;
  const formattedMinutes = (minutes < 10) ? '0' + minutes : minutes;

  // Create the formatted time string
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return formattedTime;
}
function getFormattedDate() {
  const currentDate = new Date();

  // Extract day, month, and year components
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const year = currentDate.getFullYear();

  // Ensure leading zeros for single-digit day and month
  const formattedDay = (day < 10) ? '0' + day : day;
  const formattedMonth = (month < 10) ? '0' + month : month;

  // Create the formatted date string
  const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;

  return formattedDate;
}

@Component({
  selector: 'app-group-contact-message',
  templateUrl: './group-contact-message.component.html',
  styleUrls: ['./group-contact-message.component.scss','../../messaging-module.scss']
})
export class GroupContactMessageComponent {
  constructor(private _formBuilder:FormBuilder, 
    private _sendSMSService:SendSmsService, 
    private _sharedService:SharedService,
    private _accountService:AccountService,
    private _contactGroupService:ContactGroupService
    ){}

//Send Message Form
availableBalance$:Observable<any>;
smsRecipientTabform!: FormGroup;
smsRecipienTabFormWorking = false;
// my code starts her
messageContent:string = '';
messageCharacters:number = 0;
messageCharaterLeft:number = 2295 ;
totalAllowedCharter:number = 2295;
totacharacterPerSMS = 160;
totalSms = 0;

// fetching SenderIds 
senderIds:any[]=[];
senderId!:string;
groups:any[];
getSenderIds(){
  this._sendSMSService.getSenderIds().subscribe({next:(res)=>{
    this.senderIds = res;
    
  },

  error:(err)=>{
    this._sharedService.HandleError(err);
    console.log(err);   
  }
})
}
showCalander:boolean = false;
ngOnInit(): void {
  this.getSenderIds();
  this._contactGroupService.GetAll().subscribe(res=>{
    this.groups = res.value;
  });
  this.smsRecipientTabform = this._formBuilder.group({
    senderId: ['', Validators.required],
    content: ['', Validators.required],
    smsType: ['text', Validators.required],
    schedulingType: ['sendnow', Validators.required],
    laterSendingDateTime: [null], // No validators for optional Date field
    groups: [null, [Validators.required]],
    campaignName:[JSON.parse(localStorage.getItem('Token'))['phoneNumber']+"-"+getFormattedDate()+"-"+getFormattedTime(),Validators.required],
    UserPhoneNumber:[JSON.parse(localStorage.getItem('Token'))['phoneNumber'], Validators.required]
  });
  
  this.smsRecipientTabform.get('content').valueChanges.subscribe({next:(value)=>{
    const unicodeRegex = /[^\u0000-\u007F]/;
    const specialCharactersPattern = /[~^{}[\]\\|]/;
    if(unicodeRegex.test(value) || specialCharactersPattern.test(value))
    {
      this.smsRecipientTabform.get('smsType').setValue('unicode');
      if(value.length>70){
        this.totacharacterPerSMS = 67;
      }
      else{
        this.totacharacterPerSMS = 70;
      }
    }
    else{
      this.smsRecipientTabform.get('smsType').setValue('text');
      if(value.length>160){
        this.totacharacterPerSMS = 157;
      }
      else{
        this.totacharacterPerSMS = 160;
      }
      
    }
    this.messageCharacters = value.length;
    this.totalSms = Math.ceil(this.messageCharacters/this.totacharacterPerSMS);
    this.messageCharaterLeft = this.totalAllowedCharter - this.messageCharacters;
  }});

  this.smsRecipientTabform.get('smsType').valueChanges.subscribe({next:(value)=>{
    const unicodeRegex = /[^\u0000-\u007F]/;
    const content = this.smsRecipientTabform.get('content').value;
    
  }})
  this.smsRecipientTabform.get('schedulingType').valueChanges.subscribe({next:(value)=>{
    if(value=='sendnow'){
      this.smsRecipientTabform.get('schedulingType').setValue('sendnow')
      this.showCalander = false;
    }else{
      this.smsRecipientTabform.get('schedulingType').setValue('sendlater');
      this.showCalander = true;
    }
    
  }});
  this.availableBalance$ = this._accountService.getAvailableBalance().pipe(
    observeOn(asyncScheduler)
  );
}
smsRecipientTabformOnSubmit(){
  console.log(this.smsRecipientTabform.value);
  //return;
  this.smsRecipienTabFormWorking = true;
  this._sendSMSService.addMessageByContactGroups(this.smsRecipientTabform.value).subscribe({next:(res)=>{
    console.log(res);
    this.smsRecipienTabFormWorking = false;
    if(res.statusCode == HttpStatusCode.Ok)
    {
      console.log(res);
      this.smsRecipientTabform.get('content').setValue('');
      if(res.value=="running")
      {
        this._sharedService.showSuccess('Your message are are getting inserted in background');
      }
      else{
        this._sharedService.showWarn('You have insufficient Balance to send message');
      }
    }
    else
    {
      console.log("re"+res)
      this._sharedService.HandleError(res);
    }
  },
  error:(err)=>{
    console.log(err);
    this.smsRecipienTabFormWorking = false;
    this._sharedService.HandleError(err);
  }

  });
  
}
smsRecipientTabformTotalNumbers=0;
countTotalNumber(){
  const regex = /\S+/g;
  const matches = this.smsRecipientTabform.get('recipients').value.match(regex);
  this.smsRecipientTabformTotalNumbers = matches ? matches.length : 0;
  
}

sendLaterRadioBtn:boolean = false;
senNowRadionBtn:boolean = true;
onLaterRadionBtnClick(){
  this.senNowRadionBtn= false;
  
}
onNowRadioButtonClick(){
  this.sendLaterRadioBtn = false;
}
}
