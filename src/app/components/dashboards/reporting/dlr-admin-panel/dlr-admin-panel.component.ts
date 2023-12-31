import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { GetOperatorNameByItsPhoneNumber } from 'src/app/shared/helper-functions/functions';
import { ScheduledServiceService } from '../dlr-scheduled/scheduled-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/components/shared/shared.service';
import { Observable } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { ErrorCodeService } from '../../admin-dashboard/error-code/error-code.service';

@Component({
  selector: 'app-dlr-admin-panel',
  templateUrl: './dlr-admin-panel.component.html',
  styleUrls: ['./dlr-admin-panel.component.scss']
})
export class DlrAdminPanelComponent {
  constructor(private productService: ProductService, 
    private scheduledService:ScheduledServiceService,
    private _formBuilder:FormBuilder, 
    private _service:ScheduledServiceService,
    private _sharedService:SharedService,
    private _confirmationService:ConfirmationService,
    private _errorCodeService:ErrorCodeService
    ) {}
  
  itemsPerPage = 10;
    first: number = 0;
    rows: number = 10;
    campaigns:any[];
    selectAllcampaign:boolean = false;
    selectedCampaign:any[];
    
    messages$:Observable<any>;
    searchText:string;
    errorCodes:any[];
    dateFilterForm:FormGroup = this._formBuilder.group({
      startDate:[null, Validators.required],
      endDate:[null,Validators.required]
    });
    getOperatorNameByItsPhoneNumber(number:string){
      return GetOperatorNameByItsPhoneNumber(number);
    }
    onDateFilterFormSubmit(){
      console.log(this.dateFilterForm.value);
    }
    ngOnInit() {
        
      this._errorCodeService.getAllByGetMethod().subscribe((res:any)=>{
        this.errorCodes= res.value;
      })
      this._service.getAllCampaign().subscribe({next:(res)=>{
        this.campaigns = res.value;
        this.selectAllcampaign = true;
      }})
      
    }
    getDisplayCodeByErrorCode(code){
      const error=  this.errorCodes.find(item=>item.code===Number(code));
      return error? error.displayCode : "";
    }

    
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
    const campaigns = event?.filters?.campaignViewModel?.value;
    event.selectedValues = campaigns;
    this.loding = true;
    this._service.lastTableLazyLoadEvent = event;
    if(event !== undefined){
      this._service.GetAllForAdmin(event === undefined || event ===null ? this._service.lastTableLazyLoadEvent: event).subscribe({next:(res)=>{
       
        if(res.statusCode === HttpStatusCode.Ok)
        {
          this.totalRecords = res.totalRecords;
          this.messages = res.value;
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
          this.GetAll(this._service.lastTableLazyLoadEvent);
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

  onDeleteRecipeintMessageById(id:any){
    this._confirmationService.confirm({
      accept:()=>{
        this._service.DeleteRecipeintMessageById(id).subscribe
          (
            (response: any) => {
              if (response.statusCode === HttpStatusCode.Conflict) {
                this._sharedService.showWarn(response.message, 'Conflict');
                
              } else {
                this._sharedService.showSuccess(response.message, 'Deleted');
                this.GetAll(this._service.lastTableLazyLoadEvent);
              }
            },
            error => {
              this._sharedService.HandleError(error);
            }
          );

      }
    })
  }


  // onEdit(row: any) {
  //   this._service.Populate(row);
  //   this._service.displayModal = true;

  // }

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
