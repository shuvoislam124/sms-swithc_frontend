import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';

@Component({
  selector: 'app-dlr-scheduled-sent',
  templateUrl: './dlr-scheduled-sent.component.html',
  styleUrls: ['./dlr-scheduled-sent.component.scss']
})
export class DlrScheduledSentComponent {
  customers: Customer[];

    totalRecords: number;

    cols: any[];

    loading: boolean;

    representatives: Representative[];

    selectAll: boolean = false;

    selectedCustomers: Customer[];

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.representatives = [
            {name: "Amy Elsner", image: 'amyelsner.png'},
            {name: "Anna Fali", image: 'annafali.png'},
            {name: "Asiya Javayant", image: 'asiyajavayant.png'},
            {name: "Bernardo Dominic", image: 'bernardodominic.png'},
            {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
            {name: "Ioni Bowcher", image: 'ionibowcher.png'},
            {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
            {name: "Onyama Limba", image: 'onyamalimba.png'},
            {name: "Stephen Shaw", image: 'stephenshaw.png'},
            {name: "Xuxue Feng", image: 'xuxuefeng.png'}
        ];

        this.loading = true;
    }

    loadCustomers(event: LazyLoadEvent | any) {
        this.loading = true;
        console.log(event);

        
    }

    onSelectionChange(value = []) {
        this.selectAll = value.length === this.totalRecords;
        this.selectedCustomers = value;
    }

    onSelectAllChange(event: { checked: any; }) {
        const checked = event.checked;

        if (checked) {
            
        }
        else {
            this.selectedCustomers = [];
            this.selectAll = false;
        }
    }
}
