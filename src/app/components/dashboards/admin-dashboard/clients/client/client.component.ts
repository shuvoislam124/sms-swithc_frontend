import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
    clientId:string;
    constructor(private _route:ActivatedRoute){
      this._route.params.subscribe((params)=>{
          this.clientId = params['id'];
      })
    }
    
}
