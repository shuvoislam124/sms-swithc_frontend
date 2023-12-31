export function GetOperatorNameByItsPhoneNumber(number:string){
    if(number.startsWith('88019') || number.startsWith('019') || number.startsWith('88014') || number.startsWith('014'))
        return 'Banglalink';
    else if(number.startsWith('88017') || number.startsWith('017') || number.startsWith('88013') || number.startsWith('013'))
        return 'GrameenPhone';
    else if(number.startsWith('88015') || number.startsWith('015'))
        return 'Teletalk';
    else if(number.startsWith('88016') || number.startsWith('016'))
        return 'Airtel';
    else if(number.startsWith('88018') || number.startsWith('018'))
        return 'Robi';
    else 
        return 'Unknown';

}