import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { TransationService } from '../services/transation.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent {
  products!: Product[];
  cities:any[] = [];
  selectedCity: any;
  items: MenuItem[] = [];
  

    constructor(private productService: ProductService, private transactionService: TransationService) {}

    ngOnInit() {
        
      this.getAllTransactionOfTheUser();
      console.log(this.UserTransactions);
    }
    totalTrx:number;
    UserTransactions:any[] = [];
    getAllTransactionOfTheUser(){
      return this.transactionService.getAllTransactionOfaUser().subscribe((res)=>{
        this.UserTransactions = res.value;
        this.totalTrx = res.value.length;
      });

    }
}
