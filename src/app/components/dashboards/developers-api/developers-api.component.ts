import { Component, OnInit } from '@angular/core';
import { DeveloperApiKeyService } from './developer-api-key.service';
import { HttpStatusCode } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { apiUrl } from 'src/main';

@Component({
  selector: 'app-developers-api',
  templateUrl: './developers-api.component.html',
  styleUrls: ['./developers-api.component.scss']
})
export class DevelopersApiComponent implements OnInit {
  constructor(
    public keyService:DeveloperApiKeyService,
    private _sharedService:SharedService
    )
  {}
  apiAddress= apiUrl;
  apiKey=null;
  products!:any[];
  errors!:any[];
  keyGenerating = false;
  ngOnInit(): void {
    this.products = [
      {perameterName:'apiKey', meaning:'API Key', description:'Your API Key ()'},
      {perameterName:'type', meaning:'text/unicode', description:'text for normal SMS/unicode for Bangla SMS'},
      {perameterName:'contactNumbers', meaning:'mobile numbers', description:'Exp: 88017XXXXXXXX,88018XXXXXXXX,88019XXXXXXXX...'},
      {perameterName:'textBody', meaning:'SMS body', description:'N.B: Please use url encoding to send some special characters like &, $, @ etc'},
      {perameterName:'label', meaning:'transactional/promotional', description:'use transactional label for transactional sms'},
    ];
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
