export interface VerifyOtpDto {
    phoneNumber: string;
    enteredOtp?: string | null;
    password: string;
    expirationTime?: Date | null;
    email?: string | null;
    perSmsRate?: number | null;
    availableAmount?: number | null;
}
