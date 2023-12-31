import { Component, OnInit } from '@angular/core';
import { BkashService } from '../services/bkash.service';
import { TransationService } from '../services/transation.service';
import { AccountService } from 'src/app/account/services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy-credit',
  templateUrl: './buy-credit.component.html',
  styleUrls: ['./buy-credit.component.scss']
})
export class BuyCreditComponent  implements OnInit{
  Transactions:any[] = [];
  constructor(private bkashService:BkashService, 
    private transactionService: TransationService,
    private _accountService:AccountService){}
  availableBalance$:Observable<any>;
  ngOnInit(): void {
    this.getAvalibleBalane();
    this.getLatestTransaction();
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
    if(this.amountValue<10)
        return;
    if(this.isSelectedBkash){
      this.addBalanceByBkash();
    }
  }
  getLatestTransaction(){
    this.transactionService.getLatestTransaction(10).subscribe(res=>{
      this.Transactions = res.value;
    });
  }
}
