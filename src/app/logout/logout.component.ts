import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { LoginService } from '../login.service';
import { SessiontimeoutService } from '../sessiontimeout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private session:SessiontimeoutService,private router:Router,private loginservice:LoginService,private route:ActivatedRoute) { 

  }

  ngOnInit() {
          this.session.close(); 
          this.loginservice.logout();
  }

}
