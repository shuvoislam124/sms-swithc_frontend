export interface SendMessageViewModel {
    senderId: SenderIdViewModel;
    content: string;
    smsType: string;
    schedulingType: string;
    laterSendingDateTime?: Date | null;
    recipients: string;
}
export interface SenderIdViewModel {
    Id: number;
    Number: string;
}