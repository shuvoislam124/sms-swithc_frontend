import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactService } from '../contact.service';
import { SharedService } from 'src/app/components/shared/shared.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-import-contact',
  templateUrl: './import-contact.component.html',
  styleUrls: ['./import-contact.component.scss']
})
export class ImportContactComponent {
  @Input() groupId:number;
  inProgress= false;
  constructor(
    public _service:ContactService,
    private _sharedService:SharedService,
    ){}
  onFileSelected(event: Event,formGroup:FormGroup, controlName: string): void {
    //this.userApiApprovalFG.get(controlName).clearValidators();
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const file = fileInput.files[0];
      if((fileInput.files[0].size/1024)>500)
      {
        formGroup.get(controlName).setErrors({'size':`The minimum file size is 500KB`});
        return;
      }
      const type = fileInput.files[0].type;
      // type check
      if((true))
      {
        formGroup.get(controlName)?.setValue(file);
        return;
      }
      formGroup.get(controlName).setErrors({'type':`File type should jpg/png/jpeg`});

    }
  }
  importFormTotalNubers=0;
  countTotalNumber(){
  const regex = /\S+/g;
  const matches = this._service.importform.get('numbers').value.match(regex);
  this.importFormTotalNubers = matches ? matches.length : 0;
  }
  onImportFormSubmit(){
    if(this._service.importform.valid){
      this.inProgress = true;
      const model:any ={
        numbers:this._service.importform.get('numbers').value,
        groupId:this.groupId
      } 
      this._service.ImportByForm(model).subscribe((response)=>{
        if (response.statusCode === HttpStatusCode.Ok) {
          this._sharedService.showSuccess(response.message, 'Saved');
          this._service.modified = true;
          
        } else
          {
            this._sharedService.HandleSuccessMessage(response);
          }
          this._service.displayImportModal = false;
          this.inProgress = false;
      },
      (error)=>{
        console.log(error)
        this._sharedService.HandleError(error);
        this.inProgress = false;
      })
      this._service.importform.markAllAsTouched();
      return;
    }
  }
  
}
