import { Component, OnInit } from '@angular/core';
import { BkashService } from '../services/bkash.service';
import { TransationService } from '../services/transation.service';
import { AccountService } from 'src/app/account/services/account.service';
import { Observable } from 'rxjs';
import { MenueItemsService } from 'src/app/layout/menue-items.service';
import { AuthModel } from 'src/app/account/login/auth-model';
import { updateArrayByProperty } from 'src/app/shared/helper-functions/functions';
import { SharedService } from 'src/app/components/shared/shared.service';

@Component({
  selector: 'app-buy-credit',
  templateUrl: './buy-credit.component.html',
  styleUrls: ['./buy-credit.component.scss']
})
export class BuyCreditComponent  implements OnInit{
  Transactions:any[] = [];
  menueItems:any[]=[];
  constructor(private bkashService:BkashService, 
    private transactionService: TransationService,
    private _accountService:AccountService,
    private menueItemService:MenueItemsService,
    private _sharedService:SharedService
    
    ){}
  availableBalance$:Observable<any>;
  ngOnInit(): void {
    this.getAvalibleBalane();
    this.getLatestTransaction();
    this.menueItemService.menuItems$.subscribe((value)=>{
      this.menueItems = value;
    })
  }
  
  getAvalibleBalane(){
    this.bkashService.getAvailableBalanceAmount().subscribe(res=>{
      this.availableBalance = res.amount;
    });
    this.availableBalance$ = this._accountService.getAvailableBalance();
  }
  availableBalance=0;
  isSelectedBkash = false;
  isApiWorking = false;
  btnLabel = '';
  isSelecectAMethod = false;
  amountValue:number =0.00;
  toggleBkash(){
    this.isSelectedBkash=!this.isSelectedBkash;
    this.isSelecectAMethod=!this.isSelecectAMethod;
  }
  addBalanceByBkash(){
    
    this.bkashService.addBalance(this.amountValue.toString()).subscribe((res)=>{
      window.location=res['bkashURL'];
    })
  }
  clickPayButton(){
    if(this.amountValue<20)
      {
        this._sharedService.showWarn("Minumum add credit amount is 20 Taka");
        return;
      }  
    if(this.isSelectedBkash){
      this.addBalanceByBkash();
    }
  }
  getLatestTransaction(){
    this.transactionService.getLatestTransaction(10).subscribe(response=>{
      this.Transactions = response.value;
      if(response.value.length>0)
      {
          let token: AuthModel = JSON.parse(localStorage.getItem('Token'));
          if(!token.anyTransactions)
          {
            token.anyTransactions = true;
            localStorage.setItem('Token', JSON.stringify(token));
            updateArrayByProperty(this.menueItems,'label',['Pricing','Messaging','Phone Book','Reports','API docs'],'visible',JSON.parse(localStorage.getItem('Token'))['anyTransactions'])
            this.menueItemService.updateMenuItems(this.menueItems);
          }
      }
    });
  }
}
