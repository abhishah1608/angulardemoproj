import { Component, OnInit } from '@angular/core';
import {PaymentForm} from '../payment-form';
import { FormGroup, FormBuilder,FormControlName, Validators } from '@angular/forms';
import { BookAddedInCart } from '../book-added-in-cart';
import {PaymentService} from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  bookCart : BookAddedInCart;

  paymentform : FormGroup;

  productInfo : string;

  formobj : PaymentForm;

  errorMessage = '';

  constructor(public fb:FormBuilder, public paymentservice:PaymentService) { 
    let bookcart  = sessionStorage.getItem("Cart"); 
    this.bookCart = JSON.parse(bookcart);
    sessionStorage.setItem("amount",this.bookCart.Amount.toString());
    this.productInfo = JSON.stringify(this.bookCart.detail);
  }

  ngOnInit() {

    this.paymentform = this.fb.group({
        'firstName':['',[Validators.required,Validators.maxLength(25)]],
        'lastName' :['',[Validators.required,Validators.maxLength(25)]],
        'email':['',[Validators.required]],
        'mobileNo':['',[Validators.required,Validators.maxLength(10)]],
        'country':['',[Validators.required]],
        'state':['',[Validators.required]],
        'city':['',[Validators.required]],
        'address1':['',[Validators.required]],
        'address2':['',[Validators.required]],
        'zipcode':['',[Validators.required]]
    });
  }

  onSubmit(): void
   {
        this.errorMessage = '';
        if(this.paymentform.valid == true)
        {     
        this.formobj = new PaymentForm();
        
        this.formobj.productinfo = this.productInfo;
        
        this.formobj.product = "book";

        this.formobj.amount = this.bookCart.Amount + ".00";
        
        this.formobj.firstName = this.paymentform.get("firstName").value;
        
        this.formobj.lastName =  this.paymentform.get("lastName").value;
        
        this.formobj.email = this.paymentform.get("email").value;
        
        this.formobj.phone = this.paymentform.get("mobileNo").value;
        
        this.formobj.state = this.paymentform.get("state").value;
        
        this.formobj.country = this.paymentform.get("country").value;
        
        this.formobj.address1 = this.paymentform.get("address1").value;
        
        this.formobj.address2 = this.paymentform.get("address2").value;
        
        this.formobj.city = this.paymentform.get("city").value;
        
        this.formobj.zipCode = this.paymentform.get("zipcode").value;

        this.formobj.userId = +sessionStorage.getItem("UserId");
        
        this.formobj.loginId = +sessionStorage.getItem("sessionId");
        
        this.paymentservice.Generateform(this.formobj).subscribe((formobj)=>{
          
            var form = document.createElement('form');
            form.setAttribute('action',formobj.url);
            form.setAttribute('method','post');
            var input = document.createElement('input');
            //key.
            input.setAttribute('type','hidden');
            input.setAttribute('name','key');
            input.setAttribute('id','key');
            input.setAttribute('value',formobj.key);
            form.appendChild(input);
            
            //transaction Id.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','txnid');
            input.setAttribute('id','txnid');
            input.setAttribute('value',formobj.TransactionId);
            form.appendChild(input);

            //amount.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','amount');
            input.setAttribute('id','amount');
            input.setAttribute('value',formobj.amount);
            form.appendChild(input);

            //productInfo.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','productinfo');
            input.setAttribute('id','productinfo');
            input.setAttribute('value',formobj.product);
            form.appendChild(input);

            //firstname
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','firstname');
            input.setAttribute('id','firstname');
            input.setAttribute('value',formobj.firstName);
            form.appendChild(input);

            //email
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','email');
            input.setAttribute('id','email');
            input.setAttribute('value',formobj.email);
            form.appendChild(input);

            //phone
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','phone');
            input.setAttribute('id','phone');
            input.setAttribute('value',formobj.phone);
            form.appendChild(input);

            //surl
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','surl');
            input.setAttribute('id','surl');
            input.setAttribute('value',formobj.surl);
            form.appendChild(input);

            //furl.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','furl');
            input.setAttribute('id','furl');
            input.setAttribute('value',formobj.furl);
            form.appendChild(input);

            //hash
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','hash');
            input.setAttribute('id','hash');
            input.setAttribute('value',formobj.hash);
            form.appendChild(input);

            //service_provider
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','service_provider');
            input.setAttribute('id','service_provider');
            input.setAttribute('value','payu_paisa');
            form.appendChild(input);

            //last Name.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','lastname');
            input.setAttribute('id','lastname');
            input.setAttribute('value',formobj.lastName);
            form.appendChild(input);

            //address1.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','address1');
            input.setAttribute('id','address1');
            input.setAttribute('value',formobj.address1);
            form.appendChild(input);

            //address2.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','address2');
            input.setAttribute('id','address2');
            input.setAttribute('value',formobj.address2);
            form.appendChild(input);

            //city
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','city');
            input.setAttribute('id','city');
            input.setAttribute('value',formobj.city);
            form.appendChild(input);

            //state
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','state');
            input.setAttribute('id','state');
            input.setAttribute('value',formobj.state);
            form.appendChild(input);

            //country.
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','country');
            input.setAttribute('id','country');
            input.setAttribute('value',formobj.country);
            form.appendChild(input);

            //zipcode
            input = document.createElement('input');
            input.setAttribute('type','hidden');
            input.setAttribute('name','zipcode');
            input.setAttribute('id','zipcode');
            input.setAttribute('value',formobj.zipCode);
            form.appendChild(input);
            
            //append form.
            document.body.appendChild(form);
            
            //submit form.
            form.submit();
        });
   }
   else
   {
       if(this.paymentform.get("firstName").errors && this.paymentform.get("firstName").errors.required)
       {
           this.errorMessage = "First Name is required";
       }
       else if(this.paymentform.get("lastName").errors && this.paymentform.get("lastName").errors.required)
       {
           this.errorMessage = "Last Name is required";
       }
       else if(this.paymentform.get("email").errors && this.paymentform.get("email").errors.required)
       {
           this.errorMessage = "Email is required";
       }
       else if(this.paymentform.get("mobileNo").errors && this.paymentform.get("mobileNo").errors.required)
       {
         this.errorMessage = "Mobile No is required";
       }
       else if(this.paymentform.get("country").errors && this.paymentform.get("country").errors.required)
       {
         this.errorMessage = "Country is required";
       }
       else if(this.paymentform.get("state").errors && this.paymentform.get("state").errors.required)
       {
         this.errorMessage = "State is required";
       }
       else if(this.paymentform.get("address1").errors && this.paymentform.get("address1").errors.required)
       {
          this.errorMessage = "Address 1 is required";
       }
       else if(this.paymentform.get("address2").errors && this.paymentform.get("address2").errors.required)
       {
          this.errorMessage = "Address 2 is required";
       }
       else if(this.paymentform.get("zipcode").errors && this.paymentform.get("zipcode").errors.required)
       {
          this.errorMessage = "Zipcode is required";
       }
   } 
  }

  removeMessage() {
    this.errorMessage = '';
  }
}
