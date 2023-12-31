import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { InputTextModule } from 'primeng/inputtext';


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

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.prices = customers;
            this.loading = false;

           // this.customers.forEach((customer) => (customer.date = new Date(<Date><unknown>customer.date)));
        });


    }

    clear(table: Table) {
        table.clear();
    }

    
}
