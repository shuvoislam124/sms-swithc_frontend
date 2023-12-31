import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ContactGroupService } from './contact-group.service';
import { HttpStatusCode } from '@angular/common/http';
import { SharedService } from 'src/app/components/shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
    list: any[];

    totalRecords: number;

    cols: any[];

    loading: boolean;
    selectAll: boolean = false;
    selectedOrders: any[];
    isGroupFormVisible : boolean = false;
    addContactGroupFormGroup:FormGroup;
    constructor(
      public _service: ContactGroupService, 
      private _sharedService:SharedService,
      private _formsBuilder:FormBuilder,
      private _confirmationsService:ConfirmationService
      ){}
   
    ngOnInit() {
        //this.loading = true;
    }

    GetAll(event?: LazyLoadEvent | any): void {
        this.loading = true;
        console.log(event);
        if(event !==undefined)
        {
          this._service.lastTableLazyLoadEvent = event;
        }
        this._service.GetAll(event === undefined || event == null ? this._service.lastTableLazyLoadEvent: event).subscribe({
          next:(response:any)=>{
            if(response.statusCode == HttpStatusCode.Ok)
              {
                this.list = response.value;
                console.log(this.list);
                this.totalRecords = response.totalRecords;
                this.loading = false;
              }
              else if(response.statusCode == HttpStatusCode.NoContent)
              {
                this._service.lastTableLazyLoadEvent.first !== 0 ?
                this._service.lastTableLazyLoadEvent.first - this._service.lastTableLazyLoadEvent.rows : 0;
                // this.noContentLoop = 1;
                //  this.GetAll(this._service.lastTableLazyLoadEvent);
                this.loading = false;
              }
              else{
                this.selectedOrders = response.value;
                this.totalRecords = 0;
                //this.noContentLoop = 0;
                this.loading = false;
              }
          },
          error:(error)=>{
            this._sharedService.HandleError(error);
            this.loading = false;
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
      this._service.Populate({id:row.id,name:row.name});
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
