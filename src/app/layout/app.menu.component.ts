import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Role_Admin } from 'src/global';
import { MenueItemsService } from './menue-items.service';

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
    getVisiblityByTokenPropertyName(propertyName:string)
    {

        return JSON.parse(localStorage.getItem('Token'))[propertyName];
    }
    constructor(private _service:MenueItemsService){}
    ngOnInit() {
        this._service.menuItems$.subscribe((value)=>{
            this.model = value;
        })
       
    }
    
}
function updateArrayByProperty(array, key, values, propertyToUpdate, valueToAdd) {
    array.forEach(obj => {
      if (values.includes(obj[key])) {
        obj[propertyToUpdate] = valueToAdd;
      }
});
}