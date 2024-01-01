import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Role_Admin } from 'src/global';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    allowMenueIfTheRoleExists(roles:any[]){
        let userRole = JSON.parse(localStorage.getItem('Token')).roles;
        return userRole.some(item=> roles.includes(item));
    }
    ngOnInit() {
        
        this.model = [
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
                        items: [
                            
                            {
                                label: 'Developer',
                                icon: 'pi pi-code',
                                routerLink: ['/developers']
                            },

                        ]
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
                        label: 'SMS Statistics',
                        icon: 'pi pi-chart-line',
                        routerLink: ['/reporting/sms_statistics']
                    }
                    
                ]
            },
            //my mene ends here 
            // {
                
            //     label: 'Design DashBoard',
            //     icon: 'pi pi-home',
            //     items: [
            //         {
            //             label: 'My Dashboard',
            //             icon: 'pi pi-fw pi-home',
            //             routerLink: ['/design']
            //         },
            //         {
            //             label: 'Analytics Dashboard',
            //             icon: 'pi pi-fw pi-chart-pie',
            //             routerLink: ['/dashboard-analytics']
            //         },
            //         {
            //             label: 'SaaS Dashboard',
            //             icon: 'pi pi-fw pi-bolt',
            //             routerLink: ['/dashboard-saas']
            //         },
            //         {
            //             label: 'Developers',
            //             icon: 'pi pi-code',
            //             items: [
                            
            //                 {
            //                     label: 'Developers API',
            //                     icon: 'pi pi-sitemap',
            //                     routerLink: ['/developers']
            //                 },

            //             ]
            //         },
            //     ]
            // },
            
            // {
            //     label: 'Apps',
            //     icon: 'pi pi-th-large',
            //     items: [
            //         {
            //             label: 'Blog',
            //             icon: 'pi pi-fw pi-comment',
            //             items: [
            //                 {
            //                     label: 'List',
            //                     icon: 'pi pi-fw pi-image',
            //                     routerLink: ['/apps/blog/list']
            //                 },
            //                 {
            //                     label: 'Detail',
            //                     icon: 'pi pi-fw pi-list',
            //                     routerLink: ['/apps/blog/detail']
            //                 },
            //                 {
            //                     label: 'Edit',
            //                     icon: 'pi pi-fw pi-pencil',
            //                     routerLink: ['/apps/blog/edit']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Calendar',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/apps/calendar']
            //         },
            //         {
            //             label: 'Chat',
            //             icon: 'pi pi-fw pi-comments',
            //             routerLink: ['/apps/chat']
            //         },
            //         {
            //             label: 'Files',
            //             icon: 'pi pi-fw pi-folder',
            //             routerLink: ['/apps/files']
            //         },
            //         {
            //             label: 'Kanban',
            //             icon: 'pi pi-fw pi-sliders-v',
            //             routerLink: ['/apps/kanban']
            //         },
            //         {
            //             label: 'Mail',
            //             icon: 'pi pi-fw pi-envelope',
            //             items: [
            //                 {
            //                     label: 'Inbox',
            //                     icon: 'pi pi-fw pi-inbox',
            //                     routerLink: ['/apps/mail/inbox']
            //                 },
            //                 {
            //                     label: 'Compose',
            //                     icon: 'pi pi-fw pi-pencil',
            //                     routerLink: ['/apps/mail/compose']
            //                 },
            //                 {
            //                     label: 'Detail',
            //                     icon: 'pi pi-fw pi-comment',
            //                     routerLink: ['/apps/mail/detail/1000']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Task List',
            //             icon: 'pi pi-fw pi-check-square',
            //             routerLink: ['/apps/tasklist']
            //         }
            //     ]
            // },
            // {
            //     label: 'UI Kit',
            //     icon: 'pi pi-fw pi-star-fill',
            //     items: [
            //         {
            //             label: 'Form Layout',
            //             icon: 'pi pi-fw pi-id-card',
            //             routerLink: ['/uikit/formlayout']
            //         },
            //         {
            //             label: 'Input',
            //             icon: 'pi pi-fw pi-check-square',
            //             routerLink: ['/uikit/input']
            //         },
            //         {
            //             label: 'Float Label',
            //             icon: 'pi pi-fw pi-bookmark',
            //             routerLink: ['/uikit/floatlabel']
            //         },
            //         {
            //             label: 'Invalid State',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/uikit/invalidstate']
            //         },
            //         {
            //             label: 'Button',
            //             icon: 'pi pi-fw pi-box',
            //             routerLink: ['/uikit/button']
            //         },
            //         {
            //             label: 'Table',
            //             icon: 'pi pi-fw pi-table',
            //             routerLink: ['/uikit/table']
            //         },
            //         {
            //             label: 'List',
            //             icon: 'pi pi-fw pi-list',
            //             routerLink: ['/uikit/list']
            //         },
            //         {
            //             label: 'Tree',
            //             icon: 'pi pi-fw pi-share-alt',
            //             routerLink: ['/uikit/tree']
            //         },
            //         {
            //             label: 'Panel',
            //             icon: 'pi pi-fw pi-tablet',
            //             routerLink: ['/uikit/panel']
            //         },
            //         {
            //             label: 'Overlay',
            //             icon: 'pi pi-fw pi-clone',
            //             routerLink: ['/uikit/overlay']
            //         },
            //         {
            //             label: 'Media',
            //             icon: 'pi pi-fw pi-image',
            //             routerLink: ['/uikit/media']
            //         },
            //         {
            //             label: 'Menu',
            //             icon: 'pi pi-fw pi-bars',
            //             routerLink: ['/uikit/menu'],
            //             routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
            //         },
            //         {
            //             label: 'Message',
            //             icon: 'pi pi-fw pi-comment',
            //             routerLink: ['/uikit/message']
            //         },
            //         {
            //             label: 'File',
            //             icon: 'pi pi-fw pi-file',
            //             routerLink: ['/uikit/file']
            //         },
            //         {
            //             label: 'Chart',
            //             icon: 'pi pi-fw pi-chart-bar',
            //             routerLink: ['/uikit/charts']
            //         },
            //         {
            //             label: 'Misc',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/uikit/misc']
            //         }
            //     ]
            // },
            // {
            //     label: 'Prime Blocks',
            //     icon: 'pi pi-fw pi-prime',
            //     items: [
            //         {
            //             label: 'Free Blocks',
            //             icon: 'pi pi-fw pi-eye',
            //             routerLink: ['/blocks']
            //         },
            //         {
            //             label: 'All Blocks',
            //             icon: 'pi pi-fw pi-globe',
            //             url: ['https://www.primefaces.org/primeblocks-ng'],
            //             target: '_blank'
            //         }
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     icon: 'pi pi-fw pi-compass',
            //     items: [
            //         {
            //             label: 'PrimeIcons',
            //             icon: 'pi pi-fw pi-prime',
            //             routerLink: ['utilities/icons']
            //         },
            //         {
            //             label: 'Colors',
            //             icon: 'pi pi-fw pi-palette',
            //             routerLink: ['utilities/colors']
            //         },
            //         {
            //             label: 'PrimeFlex',
            //             icon: 'pi pi-fw pi-desktop',
            //             url: ['https://www.primefaces.org/primeflex/'],
            //             target: '_blank'
            //         },
            //         {
            //             label: 'Figma',
            //             icon: 'pi pi-fw pi-pencil',
            //             url: ['https://www.figma.com/file/ijQrxq13lxacgkb6XHlLxA/Preview-%7C-Ultima-2022?node-id=354%3A7715&t=4HWBlQ8kHvfpLU08-1'],
            //             target: '_blank'
            //         }
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Login 2',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login2']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Error 2',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error2']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 },
            //                 {
            //                     label: 'Access Denied 2',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access2']
            //                 },
            //                 {
            //                     label: 'Register',
            //                     icon: 'pi pi-fw pi-user-plus',
            //                     routerLink: ['/auth/register']
            //                 },
            //                 {
            //                     label: 'Forgot Password',
            //                     icon: 'pi pi-fw pi-question',
            //                     routerLink: ['/auth/forgotpassword']
            //                 },
            //                 {
            //                     label: 'New Password',
            //                     icon: 'pi pi-fw pi-cog',
            //                     routerLink: ['/auth/newpassword']
            //                 },
            //                 {
            //                     label: 'Verification',
            //                     icon: 'pi pi-fw pi-envelope',
            //                     routerLink: ['/auth/verification']
            //                 },
            //                 {
            //                     label: 'Lock Screen',
            //                     icon: 'pi pi-fw pi-eye-slash',
            //                     routerLink: ['/auth/lockscreen']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Invoice',
            //             icon: 'pi pi-fw pi-dollar',
            //             routerLink: ['/pages/invoice']
            //         },
            //         {
            //             label: 'Wizard',
            //             icon: 'pi pi-fw pi-star',
            //             routerLink: ['/wizard']
            //         },
            //         {
            //             label: 'Help',
            //             icon: 'pi pi-fw pi-question-circle',
            //             routerLink: ['/pages/help']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/pages/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //         {
            //             label: 'Contact Us',
            //             icon: 'pi pi-fw pi-phone',
            //             routerLink: ['/pages/contact']
            //         }
            //     ]
            // },
            // {
            //     label: 'E-Commerce',
            //     icon: 'pi pi-fw pi-wallet',
            //     items: [
            //         {
            //             label: 'Product Overview',
            //             icon: 'pi pi-fw pi-image',
            //             routerLink: ['ecommerce/product-overview']
            //         },
            //         {
            //             label: 'Product List',
            //             icon: 'pi pi-fw pi-list',
            //             routerLink: ['ecommerce/product-list']
            //         },
            //         {
            //             label: 'New Product',
            //             icon: 'pi pi-fw pi-plus',
            //             routerLink: ['ecommerce/new-product']
            //         },
            //         {
            //             label: 'Shopping Cart',
            //             icon: 'pi pi-fw pi-shopping-cart',
            //             routerLink: ['ecommerce/shopping-cart']
            //         },
            //         {
            //             label: 'Checkout Form',
            //             icon: 'pi pi-fw pi-check-square',
            //             routerLink: ['ecommerce/checkout-form']
            //         },
            //         {
            //             label: 'Order History',
            //             icon: 'pi pi-fw pi-history',
            //             routerLink: ['ecommerce/order-history']
            //         },
            //         {
            //             label: 'Order Summary',
            //             icon: 'pi pi-fw pi-file',
            //             routerLink: ['ecommerce/order-summary']
            //         }
            //     ]
            // },
            // {
            //     label: 'User Management',
            //     icon: 'pi pi-fw pi-user',
            //     items: [
            //         {
            //             label: 'List',
            //             icon: 'pi pi-fw pi-list',
            //             routerLink: ['profile/list']
            //         },
            //         {
            //             label: 'Create',
            //             icon: 'pi pi-fw pi-plus',
            //             routerLink: ['profile/create']
            //         }
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     icon: 'pi pi-fw pi-align-left',
            //     items: [
            //         {
            //             label: 'Submenu 1',
            //             icon: 'pi pi-fw pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 1.1.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         },
            //                         {
            //                             label: 'Submenu 1.1.2',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         },
            //                         {
            //                             label: 'Submenu 1.1.3',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 1.2.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2',
            //             icon: 'pi pi-fw pi-align-left',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 2.1.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         },
            //                         {
            //                             label: 'Submenu 2.1.2',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2',
            //                     icon: 'pi pi-fw pi-align-left',
            //                     items: [
            //                         {
            //                             label: 'Submenu 2.2.1',
            //                             icon: 'pi pi-fw pi-align-left',
            //                         }
            //                     ]
            //                 }
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Start',
            //     icon: 'pi pi-fw pi-download',
            //     items: [
            //         {
            //             label: 'Buy Now',
            //             icon: 'pi pi-fw pi-shopping-cart',
            //             url: ['https://www.primefaces.org/store']
            //         },
            //         {
            //             label: 'Documentation',
            //             icon: 'pi pi-fw pi-info-circle',
            //             routerLink: ['/documentation']
            //         }
            //     ]
            // }
        ];
    }
}
