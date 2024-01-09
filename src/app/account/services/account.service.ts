import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IfExistsModel } from 'src/app/common-model/IfExistsModel';
import { apiUrl } from 'src/main';
import { RegistrationModel } from '../models/RegistrationModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  registrationUrl: string = apiUrl + 'Accounts/registration_by_portal';
  registrationConfirmUrl:string = apiUrl+'Accounts/registration_confirm';
  ifEmailExistsUrl: string = apiUrl + 'Accounts/ifuseremailalreadyexists';
  IfPhoneNumberExistUrl:string = apiUrl+'Accounts/ifphonenumberalreadyexists';
  getAllUserUrl: string = apiUrl + 'Accounts/getall';
  getAllTimeAddedMessagesTotalUrl:string = apiUrl+'Accounts/total-message-added-for-all-time'; 
  getTodaysDeliveredMessageTotalUrl:string = apiUrl+'Accounts/total-message-deleivered-for-today'; 
  controller = 'Accounts';
  constructor(private _httpClient: HttpClient) { }
  
  IfPhoneNumberExist(Id:any, phoneNumber:any): Observable<any>{
    const model:IfExistsModel = {
      phoneNumber: phoneNumber
    }
    if(Id==null){
      return this._httpClient.post<any>(this.IfPhoneNumberExistUrl,model);
    }
    else{
      model.id=Id;
      return this._httpClient.post<any>(this.IfPhoneNumberExistUrl,model);
    }
    
  }
  RegisterUser(data:any){
    return this._httpClient.post<any>(this.registrationUrl, data);
  }
  RegisterationConfirmByOtp(data:any){
    return this._httpClient.post<any>(this.registrationConfirmUrl, data);
  }
  getAvailableBalance(){
    return this._httpClient.get<any>(apiUrl+this.controller+'/available_balance');
  }
  getAllTimeMessageAddedTotal(){
    return this._httpClient.get<any>(this.getAllTimeAddedMessagesTotalUrl);
  }
  getTodaysDeliveredMessageTotal(){
    return this._httpClient.get<any>(this.getTodaysDeliveredMessageTotalUrl);
  }
  getAllTimeMessageProcessing(){
    return this._httpClient.get<any>(apiUrl+this.controller+'/total-recipient-message-processing');
  }
  ResendOtpForRegestration(data:any){
    return this._httpClient.post(apiUrl+this.controller+'/resend_regestration_otp',data);
  }
}
