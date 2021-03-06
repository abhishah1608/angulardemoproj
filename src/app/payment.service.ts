import { Injectable } from '@angular/core';
import { PaymentForm } from './payment-form';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PaymentInfo } from './payment-info';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url : string =  this.global.baseurlservice + "Payment/";

  constructor(private httpclient: HttpClient,private global: GlobalService) { }

  Generateform(payment:PaymentForm) : Observable<PaymentForm>{
    
    let urlpath = this.url + "Generateform";    
    const httpOptions = {
      headers: new HttpHeaders({'accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'})
    };

    return this.httpclient.post<PaymentForm>(urlpath,payment,httpOptions);
  }

  GetPaymentStatus(payumoneyId : number) : Observable<PaymentInfo>
  {
    let urlpath = this.url + "GetPaymentDetail"+"?payumoneyId="+ payumoneyId;    
    const httpOptions = {
      headers: new HttpHeaders({'accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'})
    };

    return this.httpclient.get<PaymentInfo>(urlpath,httpOptions);
  }

}
