import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAddClass } from '../user-add-class';
import { HistoryInfo } from '../history-info';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  url : string = "https://demoangularapp.gear.host/api/History/";

  historyinfo : HistoryInfo = null;

  constructor(private httpclient: HttpClient) { }



  ngOnInit() {

    let apiurl  = this.url + "GetPurchaseHistory";

    let user : UserAddClass = new UserAddClass();

    user.LoginId = 0;
    user.emailId = "";
    user.UserId = Number(sessionStorage.getItem("UserId"));

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'})
    };

    this.httpclient.post(apiurl,user,httpOptions).subscribe((data)=>{ 
        this.historyinfo = data as HistoryInfo; 
        
    });

  }

}
