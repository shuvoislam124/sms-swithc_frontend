import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { ScheduledServiceService } from '../scheduled-service.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { SharedService } from 'src/app/components/shared/shared.service';
import { GetOperatorNameByItsPhoneNumber } from 'src/app/shared/helper-functions/functions';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-dlr-scheduled-upcoming',
  templateUrl: './dlr-scheduled-upcoming.component.html',
  styleUrls: ['./dlr-scheduled-upcoming.component.scss']
})
export class DlrScheduledUpcomingComponent {
  getOperatorNameByItsPhoneNumber(number:string){
    return GetOperatorNameByItsPhoneNumber(number);
  }
  products!: Product[];
  cities:any[];
  selectedCity: any;
  items: MenuItem[] = [];
  itemsPerPageOptions = [
    {value:10, label:10},
    {value:20, label:20},
    {value:30, label:30},
    {value:50, label:50},
    {value:100, label:100}
  ];

  filterForm:FormGroup;

    constructor(private productService: ProductService, 
      private scheduledService:ScheduledServiceService,
      private _formBuilder:FormBuilder, 
      private _service:ScheduledServiceService,
      private _sharedService:SharedService,
      private _confirmationService:ConfirmationService
      ) {}
    messages$:Observable<any>;
    searchText:string;
    errorCodes:any[];
    ngOnInit() {
     
      this._service.getAllCampaign().subscribe({next:(res)=>{
        this.campaigns = res.value;
        this.selectAllcampaign = true;
      }});
      
    }

    itemsPerPage = 10;
    first: number = 0;

    rows: number = 10;
    campaigns:any[];
    selectAllcampaign:boolean = false;
    selectedCampaign:any[];
    onSelectionChange(value = []) {
      this.selectAllcampaign = value.length === this.campaigns.length;
      this.selectedCampaign = value;
      console.log(this.selectedCampaign);
  }

  onSelectAllChange(event) {
      const checked = event.checked;

      if (checked) {
            this._service.getAllCampaign().subscribe({next:(res)=>{
              this.campaigns = res.value;
              this.selectAllcampaign = true;
            }})
      }
      else {
          this.selectedCampaign = [];
          this.selectAllcampaign = false;
      }
  }


  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
  }

  loding:boolean = true;
  list: any;
  totalRecords = 0;
  noContentLoop = 0;
  sortField:string = 'name';
  messages:any[];
  GetAll(event?: LazyLoadEvent | any): void {
    console.log(event);
    const campaigns = event.filters.campaignViewModel?.value;
    event.selectedValues = campaigns;
    this.loding = true;
    this._service.lastTableLazyLoadEvent = event;
    if(event !== undefined){
      this._service.GetAll(event === undefined || event ===null ? this._service.lastTableLazyLoadEvent: event).subscribe({next:(res)=>{
       
        if(res.statusCode === HttpStatusCode.Ok)
        {
          this.totalRecords = res.totalRecords;
          this.messages = res.value;
          console.log(this.messages);
          this.loding= false;
        }
        else if (res.statusCode === HttpStatusCode.NoContent) {
          if (this.noContentLoop === 0) {
            this._service.lastTableLazyLoadEvent.first = this._service.lastTableLazyLoadEvent.first !== 0 ?
              this._service.lastTableLazyLoadEvent.first - this._service.lastTableLazyLoadEvent.rows : 0;
            this.noContentLoop = 1;
            this.GetAll(this._service.lastTableLazyLoadEvent);
          } else {
            this.list = res.value;
            this.totalRecords = 0;
            this.noContentLoop = 0;
          }
        } else {
          this._sharedService.showCustom('Unknown HttpResponse From Server', 'Unknown Status Code', true);
        }
        this.loding = false;
      },
      error:(err)=>{
        this._sharedService.HandleError(err);
        this.loding = false; 
        console.log(err);
      }
    
    })
    }
    
    this._service.displayModal = true;
  }

  LoadData() {
    if (this._service.modified)
      this.GetAll();
    this._service.modified = false;
  }

  // onDelete(id: any) {
  //   this.confirmationService.confirm({
  //     accept: () => {
  //       this._service.Delete(id).subscribe
  //         (
  //           (response: any) => {
  //             if (response.statusCode === HttpStatusCode.Conflict) {
  //               this._sharedService.showWarn(response.message, 'Conflict');
  //             } else {
  //               this._sharedService.showSuccess(response.message, 'Deleted');
  //               this.GetAll();
  //             }
  //           },
  //           error => {
  //             this._sharedService.HandleError(error);
  //           }
  //         );
  //     }
  //   });
  // }

  getVal(event: any) {
    if ((event.target as HTMLInputElement)?.value) {
      return (event.target as HTMLInputElement).value;
    }
    return '';
  }

  // GetActions(value) {
  //   let menuItems: MenuItem[];
  //   menuItems = [
  //     {
  //       label: 'Edit', icon: 'pi pi-pencil', command: () => {
  //         this.onEdit(value);
  //         //this.router.navigate(['customer-profile/update/' + value.id])
  //       }
  //     },
  //     {
  //       label: 'Delete', icon: 'pi pi pi-trash', command: () => {
  //         this.onDelete(value.id)
  //       }
  //     },
  //   ];
  //   return menuItems
  // }
}
