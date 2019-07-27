import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';
import { BookDetails } from '../book-details';
import { PaymentInfo } from '../payment-info';
import { SendEmail } from '../send-email';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {

  payumoneyId : number; 

  Bookdetail : BookDetails[];

  status : string;

  amount : string;

  header : string;

  orderId : string;

  constructor(private route: ActivatedRoute, private paymentservice:PaymentService,private http:HttpClient) { 
    
  }

  ngOnInit() {

    this.payumoneyId = +this.route.snapshot.paramMap.get("PayuMoneyId");
        
    this.paymentservice.GetPaymentStatus(this.payumoneyId).subscribe((data)=>{
     
      var d = data as PaymentInfo;
      
      this.Bookdetail = d.details;

      this.status = d.status;

      this.amount =d.amount;

      this.orderId = d.OrderId;

      if(this.status.toLowerCase() === "success")
      {
        this.header = "Your Order placed Successfully and payment is successful with OrderId "+ d.OrderId;
        const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*'})
        };
        let email : SendEmail = new SendEmail();
        email.From = "abhishah1608@gmail.com";
        email.password="krishna123@.";
        email.Subject= "Your Order has been Successfully placed for Books from Bookstore with OrderId  " + d.OrderId;
        let body = sessionStorage.getItem("body");
        if(this.amount != undefined && this.amount != null)
        {
        body = "<h3 style='text-align=center'>"+"Order successfully placed"+"</h3><br>" + body + "<br><h3 style='color:blue;text-align=center'>"+"Amount :"+ this.amount +"</h3>"; 
        email.body = body;
        email.To = sessionStorage.getItem("email");
        email.OrderId = d.OrderId;
        let urladdress = "http://localhost:54701/api/Email/SendEmail";

        this.http.post(urladdress,email,httpOptions).subscribe((data1)=>{
            
        });
      }
      }
      else
      {
          this.header = "Your payment is failed with OrderId "+ d.OrderId;  
      }

    });


  }

}
