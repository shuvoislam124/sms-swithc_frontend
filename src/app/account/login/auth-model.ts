export interface AuthModel {
    fullName: string,
    phoneNumber:string,
    roles: string[],
    email: string,
    token: string,
    userId: string,
    apiFeature:boolean,
    refreshToken: string,
    tokenExpireTime: Date,
    refreshTokenExpireTime: Date,
    anyTransactions:boolean;
    // organizationId: string,
    // hasProfile: boolean
}
