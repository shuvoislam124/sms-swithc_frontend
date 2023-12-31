import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './profilecreate.component.html'
})
export class ProfileCreateComponent implements OnInit { 
    constructor(private _formBuilder:FormBuilder){}

    countries: any[] = [];
    inProgress:boolean = false;
    form = this._formBuilder.group({
        phoneNumber:[null, Validators.compose([Validators.required, Validators.minLength(11)])],
        password:[null,Validators.compose([Validators.required,Validators.minLength(6)])]
    })
    OnSubmit(){
        if(this.form.valid){
            this.inProgress=true;
            
        }
    }

    ngOnInit() {
        this.countries = [
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ]; 
    }

    
}