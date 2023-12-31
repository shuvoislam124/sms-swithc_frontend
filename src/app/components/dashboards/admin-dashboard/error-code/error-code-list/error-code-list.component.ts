import { Component } from '@angular/core';
import { ErrorCodeService } from '../error-code.service';
import { SharedService } from 'src/app/components/shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-error-code-list',
  templateUrl: './error-code-list.component.html',
  styleUrls: ['./error-code-list.component.scss']
})
export class ErrorCodeListComponent {
    list: any[];
    totalRecords: number;
    cols: any[];
    loading: boolean;
    selectAll: boolean = false;
    selectedOrders: any[];
    isGroupFormVisible : boolean = false;
    addErrorCodeFormGroup:FormGroup;
    errorCodeStateOptions: any[] = [
      { label: 'Off', value: false },
      { label: 'On', value: true }
    ];
    constructor(
      public _service: ErrorCodeService, 
      private _sharedService:SharedService,
      private _formsBuilder:FormBuilder,
      private _confirmationsService:ConfirmationService
      ){}
   
    ngOnInit() {
        this.loading = true;
    }

    GetAll(event?: LazyLoadEvent | any): void {
        this.loading=true;
        if(event !==undefined)
        {
          this._service.lastTableLazyLoadEvent = event;
        }
        this._service.getAll(event === undefined || event == null ? this._service.lastTableLazyLoadEvent: event).subscribe({
          next:(response:any)=>{
            if(response.statusCode == HttpStatusCode.Ok)
              {
                this.list = response.value;
                this.totalRecords = response.totalRecords;
                this.loading = false;
              }
              else if(response.statusCode == HttpStatusCode.NoContent)
              {
                this._service.lastTableLazyLoadEvent.first !== 0 ?
                this._service.lastTableLazyLoadEvent.first - this._service.lastTableLazyLoadEvent.rows : 0;
                // this.noContentLoop = 1;
                //  this.GetAll(this._service.lastTableLazyLoadEvent);
                this.loading=false;
              }
              else{
                this.selectedOrders = response.value;
                this.totalRecords = 0;
                this.loading = false;
                //this.noContentLoop = 0;
              }
          },
          error:(error)=>{
            this._sharedService.HandleError(error);
            this.loading=false;
          }
        })
        
        
    }

    onSelectionChange(value = []) {
        this.selectAll = value.length === this.totalRecords;
        this.selectedOrders = value;
    }
    getVal(event: any) {
      if ((event.target as HTMLInputElement)?.value) {
        return (event.target as HTMLInputElement).value;
      }
      return '';
    }
    
    onCreate() {
      // alert();
      this._service.Init();
      this._service.displayModal = true;
    }
    onEdit(row:any){
      
      this._service.Populate({id:row.id,code:row.code, displayCode:row.displayCode,description:row.description,retry:row.retry});
      
      this._service.displayModal = true;
      
    }
    onDelete(id:number){
      this._confirmationsService.confirm({
        accept:()=>{
          this._service.Delete(id).subscribe({
            next:(res=>{
              if(res.statusCode == HttpStatusCode.Conflict)
                  this._sharedService.showWarn(res.message,"Conflict");
              else{
                this._sharedService.showSuccess(res.message, 'Deleted');
                this.GetAll();
              }
            }),
            error:(err)=>{
              console.log(err)  
              this._sharedService.HandleError(err);
            }
          })
        }
      })
    }
    LoadData() {
      if (this._service.modified)
        this.GetAll();
      this._service.modified = false;
    }
}
