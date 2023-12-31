import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { ErrorCodeService } from '../error-code.service';
import { SharedService } from 'src/app/components/shared/shared.service';

@Component({
  selector: 'app-create-error-code',
  templateUrl: './create-error-code.component.html',
  styleUrls: ['./create-error-code.component.scss']
})
export class CreateErrorCodeComponent {
  constructor(
    public _service:ErrorCodeService,
    private _sharedService:SharedService
    ){}
    retryOptions:any[]=[
      {name:"Yes", value:true},
      {name:"No", value:false}
    ]
    inProgress = false;
    onSubmit(){
        if(this._service.form.valid){
          if(this._service.form.get('id')?.value ==null){
            this.inProgress = true;
            this._service.Add(this._service.form.value).subscribe(
              (response: any) => {
                // console.log(response);           
                if (response.statusCode === HttpStatusCode.Ok) {
                  this._sharedService.showSuccess(response.message, 'Saved');
                  this._service.modified = true;
                  
                } else
                  this._sharedService.HandleSuccessMessage(response);
                this._service.displayModal = false;
                this.inProgress = false;
              },
              (error: any) => {
                this._sharedService.HandleError(error);
                this.inProgress = false;
              }
            );
          } else {
            this.inProgress = true;
            this._service.Update(this._service.form.value ).subscribe(
              response => {
                if (response.statusCode === HttpStatusCode.Ok) {
                  this._sharedService.showSuccess(response.message, 'Updated');
                  this._service.modified = true;
                  
                  console.log("Hello Updated ");
                } else
                  this._sharedService.HandleSuccessMessage(response);
    
                this._service.displayModal = false;
                this.inProgress = false;
              },
              (error: any) => {
                this._sharedService.HandleError(error);
                this.inProgress = false;
              }
            )
            }
          }
          this._service.form.markAllAsTouched();
          return;
    }
    onCancel(){
      this._service.displayModal = false;
      this._service.Init();
    }
    
}
