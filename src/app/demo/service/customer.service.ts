import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/demo/api/customer';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    getCustomers(arg0: { lazyEvent: string; }) {
      throw new Error('Method not implemented.');
    }

    constructor(private http: HttpClient) { }

    getCustomersSmall() {
        return this.http.get<any>('assets/demo/data/customers-small.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersMedium() {
        return this.http.get<any>('assets/demo/data/customers-medium.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

    getCustomersLarge() {
        return this.http.get<any>('assets/demo/data/customers-large.json')
            .toPromise()
            .then(res => res.data as Customer[])
            .then(data => data);
    }

}
