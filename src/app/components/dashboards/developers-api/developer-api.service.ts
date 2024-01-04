import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/main';

@Injectable({
  providedIn: 'root'
})
export class DeveloperApiService {
  constructor(private  _httpClient: HttpClient) { }
  apiProfileUpdateUrl = apiUrl+'Accounts/update-api-profile';
  updateAPIProfile(model:any){
    var token = JSON.parse(localStorage.getItem('Token') ?? '')['token'];
    const formData = new FormData();
    if (model) {
      formData.append('companyName', model.companyName);
      formData.append('companyEmail', model.companyEmail);
      formData.append('companyContactPersonName', model.companyContactPersonName);
      formData.append('companyContactPersonPhoneNumber', model.companyContactPersonPhoneNumber);
      formData.append('companyContactPhoneNumber', model.companyContactPhoneNumber || '');
      formData.append('companyWebSiteUrl', model.companyWebSiteUrl || '');
      formData.append('applicationUrl', model.applicationUrl);
      formData.append('treadLicenceseNumber', model.treadLicenceseNumber);
      
      // Append file for UserApiApprovalUpdatingViewModel
      formData.append('treadLicense', model.treadLicense || '');
      
    }
    return this._httpClient.post<any>(`${this.apiProfileUpdateUrl}`, formData);
  }
}
