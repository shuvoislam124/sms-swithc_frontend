import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class AccountCompletingService {
  completingProfileurl = apiUrl+'Accounts/update-user-profile';
  constructor(private _http:HttpClient) { }
  completeProfile(model:any)
  {
    var token = JSON.parse(localStorage.getItem('Token') ?? '')['token'];
    const formData = new FormData();

    formData.append('phoneNumber', model.phoneNumber);

    // Append properties of PersonalInformationUpdatingViewModel
    formData.append('personalInformationUpdatingViewModel.fullName', model.personalInformationUpdatingViewModel.fullName);
    formData.append('personalInformationUpdatingViewModel.email', model.personalInformationUpdatingViewModel.email);

    // Append properties of NIDInformationUpdatingViewModel
    formData.append('nIDInformationUpdatingViewModel.name', model.nIDInformationUpdatingViewModel.name);
    formData.append('nIDInformationUpdatingViewModel.fathersName', model.nIDInformationUpdatingViewModel.fathersName);
    formData.append('nIDInformationUpdatingViewModel.mothersName', model.nIDInformationUpdatingViewModel.mothersName);
    formData.append('nIDInformationUpdatingViewModel.nidNumber', model.nIDInformationUpdatingViewModel.nidNumber);
    formData.append('nIDInformationUpdatingViewModel.dob', model.nIDInformationUpdatingViewModel.dob.toString());
    formData.append('nIDInformationUpdatingViewModel.address', model.nIDInformationUpdatingViewModel.address);

    // Append files for NIDInformationUpdatingViewModel
    formData.append('nIDInformationUpdatingViewModel.nidFrontPart', model.nIDInformationUpdatingViewModel.nidFrontPart || '');
    formData.append('nIDInformationUpdatingViewModel.nidBackPart', model.nIDInformationUpdatingViewModel.nidBackPart || '');

    // Append properties of UserApiApprovalUpdatingViewModel
    if (model.userApiApprovalUpdatingViewModel) {
      formData.append('userApiApprovalUpdatingViewModel.companyName', model.userApiApprovalUpdatingViewModel.companyName);
      formData.append('userApiApprovalUpdatingViewModel.companyEmail', model.userApiApprovalUpdatingViewModel.companyEmail);
      formData.append('userApiApprovalUpdatingViewModel.companyContactPersonName', model.userApiApprovalUpdatingViewModel.companyContactPersonName);
      formData.append('userApiApprovalUpdatingViewModel.companyContactPersonPhoneNumber', model.userApiApprovalUpdatingViewModel.companyContactPersonPhoneNumber);
      formData.append('userApiApprovalUpdatingViewModel.companyContactPhoneNumber', model.userApiApprovalUpdatingViewModel.companyContactPhoneNumber || '');
      formData.append('userApiApprovalUpdatingViewModel.companyWebSiteUrl', model.userApiApprovalUpdatingViewModel.companyWebSiteUrl || '');
      formData.append('userApiApprovalUpdatingViewModel.applicationUrl', model.userApiApprovalUpdatingViewModel.applicationUrl);
      formData.append('userApiApprovalUpdatingViewModel.treadLicenceseNumber', model.userApiApprovalUpdatingViewModel.treadLicenceseNumber);
      
      // Append file for UserApiApprovalUpdatingViewModel
      formData.append('userApiApprovalUpdatingViewModel.treadLicense', model.userApiApprovalUpdatingViewModel.treadLicense || '');
    }
    return this._http.post<any>(`${this.completingProfileurl}`, formData);
  }
}
