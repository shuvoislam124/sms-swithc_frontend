import { Component } from '@angular/core';
import { ProductService } from 'src/app/demo/service/product.service';
import { GetOperatorNameByItsPhoneNumber } from 'src/app/shared/helper-functions/functions';
import { ScheduledServiceService } from '../dlr-scheduled/scheduled-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/components/shared/shared.service';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { ErrorCodeService } from '../../admin-dashboard/error-code/error-code.service';
import { HttpStatusCode } from '@angular/common/http';
import { Product } from 'src/app/demo/api/product';
import { Observable } from 'rxjs';
import { SmsStatisticsService } from './sms-statistics.service';

@Component({
  selector: 'app-sms-statistics',
  templateUrl: './sms-statistics.component.html',
  styleUrls: ['./sms-statistics.component.scss']
})
export class SmsStatisticsComponent {
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
      private _service:SmsStatisticsService,
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
    startDate:string;
    endDate:string;
    ngOnInit() {
        
      this.dateFilterForm.get('startDate').valueChanges.subscribe((value)=>{
        this.startDate = this.getFormattedDate(value);
        
      })
      this.dateFilterForm.get('endDate').valueChanges.subscribe((value)=>{
        this.endDate = this.getFormattedDate(value);
        
      })
    }
    onSelectionChange(value = []) {
      this.selectAllcampaign = value.length === this.campaigns.length;
      this.selectedCampaign = value;
      console.log(this.selectedCampaign);
  }
  onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
  }
  
  loding:boolean = true;
  list: any[];
  totalRecords = 0;
  noContentLoop = 0;
  sortField:string = 'name';
  dateFilterForm:FormGroup = this._formBuilder.group({
    startDate:[null,Validators.required],
    endDate:[null, Validators.required]
  })
  //messages:any[];
  GetAll(event?: LazyLoadEvent | any, startDate?:any, endDate?:any): void {
    this.loding = true;
    this._service.lastTableLazyLoadEvent = event;
    if(event !== undefined){
      this._service.GetAll(event === undefined || event ===null ? this._service.lastTableLazyLoadEvent: event, startDate?startDate:null, endDate?endDate:null).subscribe({next:(res)=>{
        if(res.statusCode === HttpStatusCode.Ok)
        {
          this.totalRecords = res.totalRecords;
          this.list = res.value;
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

  onSubmitDateFilterForm()
  {
    if(this.dateFilterForm.valid)
    {
    this.GetAll(this._service.lastTableLazyLoadEvent,this.startDate,this.endDate);
    }
  }
  LoadData() {
    if (this._service.modified)
      this.GetAll();
    this._service.modified = false;
  }
  getFormattedDate(dateObject:Date){
    var formattedDate = (dateObject.getMonth() + 1).toString().padStart(2, '0') +
    '-' + dateObject.getDate().toString().padStart(2, '0') +
    '-' + dateObject.getFullYear();
    return formattedDate;
  }
  getVal(event: any) {
    if ((event.target as HTMLInputElement)?.value) {
      return (event.target as HTMLInputElement).value;
    }
    return '';
  }
  downloadReport(userPhoneNumber:string, smsSendingProcedureType:string, startDate?:string,endDate?:string, fileName?:string)
  {
    alert("your file will start downloaded")
    this._service.DownloadReport(userPhoneNumber,smsSendingProcedureType,startDate,endDate).subscribe((data:Blob)=>{
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName?`${fileName}.xlsx`:'report.xlsx';
      link.click();
    });
  }
}
