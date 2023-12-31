import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-developers-api',
  templateUrl: './developers-api.component.html',
  styleUrls: ['./developers-api.component.scss']
})
export class DevelopersApiComponent implements OnInit {
  products!:any[];
  errors!:any[];
  ngOnInit(): void {
    this.products = [
      {perameterName:'api_key', meaning:'API Key', description:'Your API Key ()'},
      {perameterName:'type', meaning:'text/unicode', description:'text for normal SMS/unicode for Bangla SMS'},
      {perameterName:'contacts', meaning:'mobile number', description:'Exp: 88017XXXXXXXX+88018XXXXXXXX+88019XXXXXXXX...'},
      {perameterName:'msg', meaning:'SMS body', description:'N.B: Please use url encoding to send some special characters like &, $, @ etc'},
      {perameterName:'label', meaning:'transactional/promotional', description:'use transactional label for transactional sms'},
    ];
    this.errors=[
      {code:'1002', meaning:'Sender Id/Masking Not Found'},
      {code:'1003', meaning:'API Not Found'},
      {code:'1004', meaning:'SPAM Detected'},
      {code:'1005', meaning:'Internal Error'},
      {code:'1006', meaning:'Internal Error'},
      {code:'1007', meaning:'Balance Insufficient'},
      {code:'1008', meaning:'Message is empty'},
      {code:'1009', meaning:'Message Type Not Set (text/unicode)'},
      {code:'1010', meaning:'Invalid User & Password'},
      {code:'1011', meaning:'Invalid User Id'},
    ];
  }
  
}
