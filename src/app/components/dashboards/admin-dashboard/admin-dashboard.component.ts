import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styles: [
    `
        :host ::ng-deep .p-progressbar {
            height: 6px;
        }
    `,
],
})
export class AdminDashboardComponent {

}
