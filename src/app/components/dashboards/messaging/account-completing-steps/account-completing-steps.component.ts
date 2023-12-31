import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountCompletingService } from './account-completing.service';
import { ProfileUpdatingViewModel } from './model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
interface UploadEvent {
    originalEvent: Event;
    files: File[];
}
@Component({
  selector: 'app-account-completing-steps',
  templateUrl: './account-completing-steps.component.html',
  styleUrls: ['./account-completing-steps.component.scss'],
  providers:[DynamicDialogRef]
})
export class AccountCompletingStepsComponent implements OnInit{
    isSaved = false;
    isVisibleSaveDialog = false;
    isUploaded = false;
    save() {
        this.isSaved = true;
        this.ref.close(this.isSaved);
    }
    
    
    onFileSelected(event: Event, controlName: string): void {
        //this.userApiApprovalFG.get(controlName).clearValidators();
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files) {
          const file = fileInput.files[0];
          if((fileInput.files[0].size/1024)>500)
          {
            this.nIDInformationFG.get(controlName).setErrors({'size':`The minimum file size is 500KB`});
            return;
          }
          const type = fileInput.files[0].type;
          if((type ==="image/jpeg") || (type === "image/png") || (type === "image/jpg"))
          {
            this.nIDInformationFG.get(controlName)?.setValue(file);
            return;
          }
          this.nIDInformationFG.get(controlName).setErrors({'type':`File type should jpg/png/jpeg`});

        }
      }
      onFileSelectedInuserApiApprovalFG(event: Event, controlName: string){
        //this.userApiApprovalFG.get(controlName).clearValidators();
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files) {
        const file = fileInput.files[0];
        if((fileInput.files[0].size/1024)>500)
        {
          this.userApiApprovalFG.get(controlName).setErrors({'size':`The minimum file size is 500KB`});
          return;
        }
        const type = fileInput.files[0].type;
        if((type ==="image/jpeg") || (type === "image/png") || (type === "image/jpg"))
        {
          this.userApiApprovalFG.get(controlName)?.setValue(file);
          return;
        }
        this.userApiApprovalFG.get(controlName).setErrors({'type':`File type should jpg/png/jpeg`});
        }
      }

    NidFrontPart!:File;
    onNIDfronPartUpload(event:UploadEvent){       
        this.NidFrontPart=event.files[0];
        this.nIDInformationFG.value.nidFrontPart=this.NidFrontPart;
    }
    NIDBackPart!:File;
    onNIDBackPartUpload(event:UploadEvent ){
        this.NIDBackPart = event.files[0];
        this.nIDInformationFG.value.nidBackPart = this.NIDBackPart;
        
    }
    tradeLicense!:File;
    onTradLicencesUpload(event:UploadEvent){
        this.tradeLicense = event.files[0];
        this.userApiApprovalFG.value.treadLicense = this.tradeLicense;
    } 
    profileUpdatingViewModel!:ProfileUpdatingViewModel;
    peronalInformationFG!: FormGroup;
    nIDInformationFG!:FormGroup;
    userApiApprovalFG!:FormGroup;
    returnUrl!:string;
    constructor(public messageService: MessageService, 
        private _fb:FormBuilder, 
        private accountCompletingService: AccountCompletingService,
        private actiavtedRoute:ActivatedRoute, private router:Router,
        public ref: DynamicDialogRef
        
        ) {
        this.peronalInformationFG = this._fb.group({
            fullName: ['', Validators.required],
            email: ['', Validators.compose([Validators.required,Validators.email])]
        });
        this.nIDInformationFG= this._fb.group({
            name:['',Validators.required],
            fathersName:['',Validators.required],
            mothersName:['',Validators.required],
            nidNumber:['',Validators.required],
            dob:[new Date(),Validators.required],
            address:['',Validators.required],
            nidFrontPart:[null, Validators.required],
            nidBackPart:[null, Validators.required]
        });
    
      this.userApiApprovalFG = this._fb.group({
        companyName:['',Validators.required],
        companyEmail:['',Validators.required],
        companyContactPersonName:['',Validators.required],
        companyContactPersonPhoneNumber:['',Validators.required],
        companyContactPhoneNumber:['', Validators.required],
        companyWebSiteUrl:['',Validators.required],
        applicationUrl:['',Validators.required],
        treadLicenceseNumber:['',Validators.required],
        treadLicense:[null,Validators.required],
      })
    }
    check(){
        console.log(this.nIDInformationFG.value.nidBackPart);
    }
    items!: MenuItem[];
    activeItem: MenuItem | undefined;
    agreeToSubmit:boolean=false;
    isSkipApiApproval:boolean=false;
    onSubmitForms(event:Event){
        event.preventDefault();
    }
    ngOnInit() {
        this.items = [
            { label: 'Personal Information', icon: 'pi pi-fw pi-home' },
            { label: 'NID Information', icon: 'pi pi-fw pi-calendar' },
            { label: 'API Approval', icon: 'pi pi-fw pi-pencil' },
            { label: 'Confirmation', icon: 'pi pi-fw pi-file' },
            
        ];
        

        this.activeItem = this.items[0];
        this.returnUrl = this.actiavtedRoute.snapshot.queryParams['return'] || '';
        
    }

    onActiveItemChange(event: MenuItem) {
        this.activeItem = event;
    }
    formValid = false;
    onActiveItemChangeByIndex(i:number){
        if(this.peronalInformationFG.invalid)
        {

        }
        this.activeItem=this.items[i];
    }
    
    activateLast() {
        this.activeItem = (this.items as MenuItem[])[(this.items as MenuItem[]).length - 1];
    }
    inProgress = false;
    onSumbit(){
        this.inProgress= true;     
        this.profileUpdatingViewModel ={
            phoneNumber: JSON.parse(localStorage.getItem('Token'))['phoneNumber'],
            personalInformationUpdatingViewModel:this.peronalInformationFG.value,
            nIDInformationUpdatingViewModel: this.nIDInformationFG.value,
            userApiApprovalUpdatingViewModel: this.isSkipApiApproval? null: this.userApiApprovalFG.value
        }
        this.accountCompletingService.completeProfile(this.profileUpdatingViewModel).subscribe((res)=>{
            if(res.statusCode === HttpStatusCode.Ok)
            {
                this.isUploaded=true;
                const token = JSON.parse(localStorage.getItem('Token')??'');
                token.fullName = this.peronalInformationFG.value.fullName;
                localStorage.setItem('Token',JSON.stringify(token));
                this.router.navigate([this.returnUrl]);
            }
        });
        this.inProgress=false;
    }
    
}
