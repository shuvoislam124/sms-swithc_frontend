import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/app/components/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { AuthModel } from './auth-model';
import { MenueItemsService } from 'src/app/layout/menue-items.service';
import { updateArrayByProperty } from 'src/app/shared/helper-functions/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  constructor(
    private _formBuilder:FormBuilder, 
    private _loginService: LoginService, 
    private messageService:MessageService,
    private _sharedService: SharedService,
    private menueItemService:MenueItemsService,
    private route: ActivatedRoute, 
    private router: Router
    ){}
    menueItems:any[]=[];
  ngOnInit(): void {
    this.menueItemService.menuItems$.subscribe((value)=>{
      this.menueItems = value;
    })
    localStorage.removeItem('Token');
    this.returnUrl = this.route.snapshot.queryParams['return'] || '';
  }
 
  returnUrl!: string;
  inProgress: boolean = false;
  form = this._formBuilder.group({
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.maxLength(11), Validators.minLength(11)])],
   
  });
  
  OnSubmit(){
    console.log(this.returnUrl);
    if (this.form.valid) {
      this.inProgress = true;
      this._loginService.Login(this.form.value).subscribe((response) => {
        if (response.statusCode === HttpStatusCode.Unauthorized)
            this.messageService.add({ severity: 'warn', summary: 'UnAuthorize', detail: 'No Account Found with this credential' });
        else if (response.statusCode === HttpStatusCode.Ok) {
          this._sharedService.showSuccess('Login successful');
          let token: AuthModel = response.value;
          localStorage.setItem('Token', JSON.stringify(token));
          updateArrayByProperty(this.menueItems,'label',['Pricing','Messaging','Phone Book','Reports'],'visible',JSON.parse(localStorage.getItem('Token'))['anyTransactions'])
          this.menueItemService.updateMenuItems(this.menueItems);
          this.router.navigate([this.returnUrl]);
        } else
          this._sharedService.HandleSuccessMessage(response);
        this.inProgress = false;
      },
        (error: any) => {
          this._sharedService.HandleError(error);
          this.inProgress = false;
        })
    }
    this.form.markAllAsTouched();
    return;
  }
  Registration() {
    this.router.navigate(['registration']);
  }
}

