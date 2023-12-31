import { Component } from '@angular/core';
import { ContactGroupService } from '../contact-group.service';
import { SharedService } from 'src/app/components/shared/shared.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-add-contact-group',
  templateUrl: './add-contact-group.component.html',
  styleUrls: ['./add-contact-group.component.scss']
})
export class AddContactGroupComponent {
  constructor(
    public _service:ContactGroupService,
    private _sharedService:SharedService
    ){}
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
    onCreate() {
      this._service.Init();
      this._service.displayModal = true;
    }
    
}
