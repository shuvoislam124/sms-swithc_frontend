import { Component, ElementRef, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { SharedService } from '../components/shared/shared.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent { 
    
    
    @ViewChild('menuButton') menuButton!: ElementRef;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

    @ViewChild('searchInput') searchInput!: ElementRef;
    
    constructor(public layoutService: LayoutService, public el: ElementRef, private _sharedService:SharedService) {}

    logout(){
        localStorage.removeItem('Token');
        this._sharedService.showWarn("You logged Out from the system","Logged Out");
        console.log("Yes");
    }
    activeItem!: number;

    

    get mobileTopbarActive(): boolean {
        return this.layoutService.state.topbarMenuActive;
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onRightMenuButtonClick() {
        this.layoutService.openRightSidebar();
    }

    onMobileTopbarMenuButtonClick() {
        this.layoutService.onTopbarMenuToggle();
    }

    focusSearchInput(){
       setTimeout(() => {
         this.searchInput.nativeElement.focus()
       }, 0);
    }
}
