import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnInit{

  baseurlservice : string;
  constructor() { 
    //this.baseurlservice = "http://localhost:54701/api/";
    this.baseurlservice = "https://demoangularapp.gear.host/api/";        
  }

  ngOnInit(): void {
    
  }   
}
