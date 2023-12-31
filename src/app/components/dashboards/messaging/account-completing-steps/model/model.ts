export interface NIDInformationUpdatingViewModel {
    name: string;
    fathersName: string;
    mothersName: string;
    nidNumber: string;
    dob: Date;
    address: string;
    nidFrontPart?: File;
    nidBackPart?: File;
}

export interface PersonalInformationUpdatingViewModel {
    fullName: string;
    email: string;
}
export interface UserApiApprovalUpdatingViewModel {
    companyName: string;
    companyEmail: string;
    companyContactPersonName: string;
    companyContactPersonPhoneNumber: string;
    companyContactPhoneNumber?: string ;
    companyWebSiteUrl?: string;
    applicationUrl: string;
    treadLicenceseNumber: string;
    treadLicense?: File;
}
export interface ProfileUpdatingViewModel {
    phoneNumber: string ;
    personalInformationUpdatingViewModel: PersonalInformationUpdatingViewModel;
    nIDInformationUpdatingViewModel: NIDInformationUpdatingViewModel;
    userApiApprovalUpdatingViewModel?: UserApiApprovalUpdatingViewModel | null ;
}

