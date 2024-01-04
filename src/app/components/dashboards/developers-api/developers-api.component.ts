import { Component, OnInit } from '@angular/core';
import { DeveloperApiKeyService } from './developer-api-key.service';
import { HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { apiUrl } from 'src/main';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeveloperApiService } from './developer-api.service';
import { MenueItemsService } from 'src/app/layout/menue-items.service';
import { updateArrayByProperty } from 'src/app/shared/helper-functions/functions';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-developers-api',
  templateUrl: './developers-api.component.html',
  styleUrls: ['./developers-api.component.scss']
})
export class DevelopersApiComponent implements OnInit {
  userApiApprovalFG!:FormGroup;
  tradeLicense!:File;
  onFileSelectedInuserApiApprovalFG(event: Event, controlName: string){
    //this.userApiApprovalFG.get(controlName).clearValidators();
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
    const file = fileInput.files[0];
    if((fileInput.files[0].size/1024)>500)
    {
      this.userApiApprovalFG.get(controlName).setErrors({'size':`The minimum file size is 500KB`});
      return;
    }
    const type = fileInput.files[0].type;
    if((type ==="image/jpeg") || (type === "image/png") || (type === "image/jpg"))
    {
      this.userApiApprovalFG.get(controlName)?.setValue(file);
      return;
    }
    this.userApiApprovalFG.get(controlName).setErrors({'type':`File type should jpg/png/jpeg`});
    }
  }
  onTradLicencesUpload(event:UploadEvent){
    this.tradeLicense = event.files[0];
    this.userApiApprovalFG.value.treadLicense = this.tradeLicense;
  }
  constructor(
    public keyService:DeveloperApiKeyService,
    private _sharedService:SharedService,
    private _apiService:DeveloperApiService,
    private _fb:FormBuilder,
    
    )
  {}
  apiAddress= apiUrl;
  apiKey=null;
  products!:any[];
  apiFeatureEnable;
  errors!:any[];
  formWorking = false;
  keyGenerating = false;
  
  ngOnInit(): void {
    
    this.apiFeatureEnable  = JSON.parse(localStorage.getItem('Token'))['apiFeature']
    this.products = [
      {perameterName:'apiKey', meaning:'API Key', description:'Your API Key ()'},
      {perameterName:'type', meaning:'text/unicode', description:'text for normal SMS/unicode for Bangla SMS'},
      {perameterName:'contactNumbers', meaning:'mobile numbers', description:'Exp: 88017XXXXXXXX,88018XXXXXXXX,88019XXXXXXXX...'},
      {perameterName:'textBody', meaning:'SMS body', description:'N.B: Please use url encoding to send some special characters like &, $, @ etc'},
      {perameterName:'label', meaning:'transactional/promotional', description:'use transactional label for transactional sms'},
    ];
    this.userApiApprovalFG = this._fb.group({
      companyName:['',Validators.required],
      companyEmail:['',Validators.required],
      companyContactPersonName:['',Validators.required],
      companyContactPersonPhoneNumber:['',Validators.required],
      companyContactPhoneNumber:['', Validators.required],
      companyWebSiteUrl:['',Validators.required],
      applicationUrl:['',Validators.required],
      treadLicenceseNumber:['',Validators.required],
      treadLicense:[null,Validators.required],
    })
    this.errors=[
      {code:'5201 ', meaning:'API not valid.'},
      {code:'5202', meaning:'API not Active.'},
      {code:'5203', meaning:'Sender Id not valid.'},
      {code:'5204', meaning:'Test Body not valid.'},
      {code:'5205', meaning:'Contact Numbers Not Valid.'},
      {code:'5206', meaning:'Insuficient Balance.'},
      {code:'5207', meaning:'Insuficient Balance of your seller (The person opned your account).'},
      {code:'5208', meaning:'Account Not Active.'},
      {code:'5209', meaning:'Account Expired.'},
    ];

    this.GetKey();
    
  }
  onSubmit(){
    // console.log(this.userApiApprovalFG.value);
    this._apiService.updateAPIProfile(this.userApiApprovalFG.value).subscribe((response)=>{
      if(response.statusCode == 200)
        {
          const token = JSON.parse(localStorage.getItem('Token'));
          token.apiFeature = true;
          localStorage.setItem('Token',JSON.stringify(token));
          this.apiFeatureEnable = true;
          
        }
        
    });
  }
 
  GetKey()
  {
    this.keyService.GetCurrentUserApiKey().subscribe((response:any)=>{
      if(response.statusCode = HttpStatusCode.Accepted){
        this.apiKey = response.value;
        
      }
    })
  }
  LoadKey() {
    if (this.keyService.keyModified)
      this.GetKey();
    this.keyService.keyModified = false;
  }
  OngenerateClick(){
    this.keyService.showModal = true;
  }
  GenerateButtonClicked(){
    this.keyGenerating = true;
    this.keyService.GenerateKey().subscribe((response:any)=>{
      if(response.statusCode== HttpStatusCode.Accepted){
        this.keyGenerating=false;
        this.GetKey();
        this.keyService.showModal = false;
        this._sharedService.showSuccess(response.message,'key')
      }
      else{
        this.keyGenerating=false;
        this.GetKey();
        this.keyService.showModal = false;
      }
    })
  }
}
