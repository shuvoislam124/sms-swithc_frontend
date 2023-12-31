import { Component } from '@angular/core';
import { ContactGroupService } from '../group-table/contact-group.service';
import { SharedService } from 'src/app/components/shared/shared.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';
import { ContactService } from './contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {
  list: any[];

    totalRecords: number;

    cols: any[];

    loading: boolean;
    selectAll: boolean = false;
    selectedOrders: any[];
    isGroupFormVisible : boolean = false;
    addContactGroupFormGroup:FormGroup;
    groupId:number;
    groupName:string;
    itemsPerPage = 10;
    first: number = 0;
    rows: number = 10;
    constructor(
      public _service: ContactService, 
      private _sharedService:SharedService,
      private _formsBuilder:FormBuilder,
      private _confirmationsService:ConfirmationService,
      private _route:ActivatedRoute
      ){}
   
    ngOnInit() {
        //this.loading = true;
        this._route.params.subscribe((params)=>{
          this.groupId = params['id'];
          this.groupName=params['name'];
        })
    }

    GetAll(event?: LazyLoadEvent | any): void {
        this.loading = true;
        if(event !==undefined)
        {
          this._service.lastTableLazyLoadEvent = event;
        }
        this._service.GetAll(event === undefined || event == null ? this._service.lastTableLazyLoadEvent: event,this.groupId).subscribe({
          next:(response:any)=>{
            if(response.statusCode == HttpStatusCode.Ok)
              {
                this.list = response.value;
                console.log(response);
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

              }
          },
          error:(error)=>{
            console.log(error);
            this._sharedService.HandleError(error);
            this.loading=false;
          }
        });  
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
    onImoport(){
      this._service.Init();
      this._service.displayImportModal = true;
    }
    onEdit(row:any){
      this._service.Populate(row);     
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
    onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
  }
}
