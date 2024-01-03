import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role_Admin } from 'src/global';

@Injectable({
  providedIn: 'root'
})
export class MenueItemsService {
  allowMenueIfTheRoleExists(roles:any[]){
    if(!localStorage.getItem('Token'))
      return false;
    let userRole = JSON.parse(localStorage.getItem('Token')).roles;
    return userRole.some(item=> roles.includes(item));
    }
    getVisiblityByTokenPropertyName(propertyName:string)
    {
      return localStorage.getItem('Token')? JSON.parse(localStorage.getItem('Token'))[propertyName]: false;
    }
  model:any[] = [
    // my menue starts here
    {
        
        label: 'DashBoard',
        icon: 'pi pi-home',
        items: [
            {
                label: 'My Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/']
            },
            
        ]
    },
    {
        label: 'Messaging',
        visible:this.getVisiblityByTokenPropertyName('anyTransactions'),
        icon: 'pi pi-th-large',
        items: [
            
            {
                label: 'Messaging',
                icon: 'pi pi-fw pi-envelope',
                items: [
                    
                    {
                        label: 'Send SMS',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/messaging/sendmessage']
                    },
                    {
                        label: 'Send Dynamic SMS',
                        icon: 'pi pi-arrow-down-right',
                        routerLink: ['/messaging/senddynamicmessage']
                    },
                    // {
                    //     label: 'Send SMS Big File',
                    //     icon: 'pi pi-file',
                    //     routerLink: ['/messaging/sendmessagebigfile']
                    // },
                    {
                        label: 'Campaign',
                        icon: 'pi pi-briefcase',
                        routerLink: ['/messaging/campaign']
                    },
                    {
                        label: 'Sender Id',
                        icon: 'pi pi-id-card',
                        routerLink: ['/messaging/senderid']
                    },
                    {
                        label: 'Templates',
                        icon: 'pi pi-palette',
                        routerLink: ['/messaging/smstemplates']
                    },
                    {
                        label: 'Inbox',
                        icon: 'pi pi-fw pi-inbox',
                        routerLink: ['/messaging/inbox']
                    },
                ]
            },
            
            
            
        ]
    },
    {
        label: 'Pricing',
        visible:this.getVisiblityByTokenPropertyName('anyTransactions'),
        icon: 'pi pi-dollar',
        items: [

            {
                label: 'Pricing',
                icon: 'pi pi-cart-plus',
                items: [
                    
                    {
                        label: 'Price',
                        icon: 'pi pi-money-bill',
                        routerLink: ['/priceandcoverage']
                    },

                ]
            },
            
            
        ]
    },
    {
        label: 'Phone Book',
        icon: 'pi pi-dollar',
        visible:this.getVisiblityByTokenPropertyName('anyTransactions'),
        items: [

            {
                label: 'Phone Book',
                icon: 'pi pi-mobile',
                items: [
                    
                    {
                        label: 'Contacts and Group',
                        icon: 'pi pi-book',
                        routerLink: ['/phonebook/groups']
                    },

                ]
            },
            
            
        ]
    },
    {
        label: 'Reports',
        visible:this.getVisiblityByTokenPropertyName('anyTransactions'),
        icon: 'pi pi-file',
        items: [

            {
                label: 'Reports',
                icon: 'pi pi-chart-line',
                items: [
                    
                    {
                        label: 'DLR- Panel',
                        icon: 'pi pi-stop',
                        routerLink: ['/reporting/dlr_scheduled/upcoming']
                    },
                    
                    // {
                    //     label: 'DLR- API',
                    //     icon: 'pi pi-table',
                    //     routerLink: ['/developers']
                    // },
                    // {
                    //     label: 'DLR- Scheduled',
                    //     icon: 'pi pi-chart-pie',
                    //     items:[
                    //         {
                    //             label: 'Sent',
                    //             icon: 'pi pi-send',
                    //             routerLink: ['/reporting/dlr_scheduled/sent']
                    //         },
                    //         {
                    //             label: 'Up Comming',
                    //             icon: 'pi pi-arrow-up-right',
                    //             routerLink: ['/reporting/dlr_scheduled/upcoming']
                    //         },
                    //     ]
                    // },

                ]
            },
            
            
        ]
    },
    {
        label: 'Payments',
        icon: 'pi pi-dollar',
        items: [

            {
                label: 'Payments',
                icon: 'pi pi-dollar',
                items: [
                    
                    {
                        
                        label: 'Transaction History',
                        icon: 'pi pi-history',
                        routerLink: ['/payment/transaction_history']
                    },
                    {
                        label: 'Buy Credit',
                        icon: 'pi pi-credit-card',
                        routerLink: ['/payment/buy_credit']
                    },

                ]
            },
            
            
        ]
    },
    {
        label: 'API docs',
        icon: 'pi pi-code',
        items: [

            {
                label: 'API Docs',
                icon: 'pi pi-code',
                routerLink: ['/developers']
            },
        ]
    },
    
    {
        label: 'Administration',
        icon: 'pi pi-dollar',
        //RoleName:[Role_Admin],
        visible:this.allowMenueIfTheRoleExists([Role_Admin]),
        items: [

            {
                label: 'Error Code',
                icon: 'pi pi-dollar',
                items: [
                    
                    {
                        label: 'Error Code',
                        icon: 'pi pi-list',
                        routerLink: ['admin/error_code']
                    },
                    

                ]
            },
            {
                label: 'Admin Panel',
                icon: 'pi pi-stop',
                routerLink: ['/reporting/dlr_admin_panel']
            },
            {
                label: 'Clients',
                icon: 'pi pi-users',
                routerLink: ['/admin/clients']
            },
            {
                label: 'SMS Statistics',
                icon: 'pi pi-chart-line',
                routerLink: ['/reporting/sms_statistics']
            },
            
        ]
    },
    //my mene ends here 
    
    ];
  private menueItemsSubject = new BehaviorSubject<any[]>(this.model);
  menuItems$ = this.menueItemsSubject.asObservable();
  constructor() { }
  updateMenuItems(newvalue:any[]){
    this.menueItemsSubject.next(newvalue);
  }
}
