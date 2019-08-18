import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnInit{

  baseurlservice : string;
  constructor() { 
    //this.baseurlservice = "http://localhost:54701/api/";
    //api for url service.
    //url for Web Api developed in Asp.net. 
    this.baseurlservice = "https://demoangularapp.gear.host/api/";        
  }

  ngOnInit(): void {
    
  }   
}
