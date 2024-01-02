import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { Customer } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ClientsService } from './clients.service';
import { SharedService } from 'src/app/components/shared/shared.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
        loding:boolean = true;
      totalRecords = 0;
      noContentLoop = 0;
      sortField:string = 'name';
      clients:any[];
      itemsPerPage = 10;
      actionButtonMenueItems: MenuItem[];

        constructor(
          private _formBuilder:FormBuilder, 
          public _service:ClientsService,
          private _sharedService:SharedService,
          private _confirmationService:ConfirmationService
          ) {

            this.actionButtonMenueItems = [
                // {
                //     label: 'Update',
                //     icon: 'pi pi-refresh',
                //     command: () => {
                //         this.update();
                //     }
                // },
                
                { label: 'View', icon: 'pi pi-eye', url: 'http://angular.io' },
                { separator: true },
                { label: 'Installation', icon: 'pi pi-cog', routerLink: ['/installation'] }
            ];
          }
       
    onCreate() {
    // alert();
    this._service.Init();
    this._service.displayModal = true;
    }
    GetAll(event?: LazyLoadEvent | any): void {
        this.loding = true;
        console.log(event);
        if(event !==undefined)
        {
          this._service.lastTableLazyLoadEvent = event;
        }
        this._service.GetAll(event === undefined || event == null ? this._service.lastTableLazyLoadEvent: event).subscribe({
          next:(response:any)=>{
            if(response.statusCode == HttpStatusCode.Ok)
              {
                this.clients = response.value;
                console.log(this.clients);
                this.totalRecords = response.totalRecords;
                this.loding = false;
              }
              else if(response.statusCode == HttpStatusCode.NoContent)
              {
                this._service.lastTableLazyLoadEvent.first !== 0 ?
                this._service.lastTableLazyLoadEvent.first - this._service.lastTableLazyLoadEvent.rows : 0;
                // this.noContentLoop = 1;
                //  this.GetAll(this._service.lastTableLazyLoadEvent);
                this.loding = false;
              }
              else{
                
                this.totalRecords = 0;
                //this.noContentLoop = 0;
                this.loding = false;
              }
          },
          error:(error)=>{
            this._sharedService.HandleError(error);
            this.loding = false;
          }
        })
        
        
    }
    
      LoadData() {
        if (this._service.modified)
          this.GetAll();
        this._service.modified = false;
      }
      getVal(event: any) {
        if ((event.target as HTMLInputElement)?.value) {
          return (event.target as HTMLInputElement).value;
        }
        return '';
      }
      
    
      
}
