import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
  selector: 'app-sender-id',
  templateUrl: './sender-id.component.html',
  styleUrls: ['./sender-id.component.scss',]
})
export class SenderIdComponent {
  products!: Product[];
  cities:any[] = [];
  selectedCity: any;
  items: MenuItem[] = [];
  

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products = data;
        });
      

        this.items = [
          
          { label: 'Delete', icon: 'pi pi-times' },
          { label: 'Mark Default', icon: 'pi pi-refresh' }
          
      ];
      this.cities.push({ label: 'Select City', value: null });
      this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
      this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
      this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
      this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
      this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
    }
}
