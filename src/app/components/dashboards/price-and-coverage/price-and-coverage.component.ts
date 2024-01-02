import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { InputTextModule } from 'primeng/inputtext';
import { PriceAndCoverageService } from './price-and-coverage.service';
import { HttpStatusCode } from '@angular/common/http';


@Component({
  selector: 'app-price-and-coverage',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule  ],
  templateUrl: './price-and-coverage.component.html',
  styleUrls: ['./price-and-coverage.component.scss']
})
export class PriceAndCoverageComponent {
  prices!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];
    nonMaskinPrice;
    constructor(private customerService: CustomerService, private _service:PriceAndCoverageService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.prices = customers;
            
           // this.customers.forEach((customer) => (customer.date = new Date(<Date><unknown>customer.date)));
        });
        this._service.GetNonMaskingPrice().subscribe((response:any)=>{
          if(response.statusCode==HttpStatusCode.Ok){
            this.nonMaskinPrice = response.value;
            console.log(response);
          }
          this.loading = false;
        })


    }

    clear(table: Table) {
        table.clear();
    }

    
}
