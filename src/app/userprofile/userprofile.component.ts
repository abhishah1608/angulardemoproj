import { Component, OnInit } from '@angular/core';
import {SessiontimeoutService} from '../sessiontimeout.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private session:SessiontimeoutService) { 
        
  }

  

  ngOnInit() {
    
  }

}
