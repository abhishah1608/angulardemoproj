import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookAddedInCart } from '../book-added-in-cart';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnDestroy {
  
  bookCart : BookAddedInCart;

  bindvalue : string = null;

  localize : any = {
    currencysymbol : "₹", 
  }



  dataAdapter: any;

  constructor(private router:Router) { }
  source: any  = null;
  

  ngOnInit() 
  {
     let bookcart  = sessionStorage.getItem("Cart"); 
     this.bookCart = JSON.parse(bookcart);
     this.bindvalue = bookcart;
     this.source =
    {
        datatype: 'json',
        datafields: [
            { name: 'BookName', type: 'string' },
            { name: 'Quantity', type: 'int' },
            { name: 'total', type: 'float' }
        ],
        localdata : this.bindvalue
    };
     this.dataAdapter = new jqx.dataAdapter(this.source);
  }

  //method redirect to payment details screen to get payment detail of customer.
  AddToCart() {
    var bRetval : boolean = false;
    let body : string = document.getElementById("cart").innerHTML;
    sessionStorage.setItem("body",body);
    this.router.navigate(['app/payment']);
    return  bRetval;
  }

	getWidth() : any {
		if (document.body.offsetWidth < 850) {
			return '90%';
		}
		
		return 850;
	}

  
  
    cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any, rowdata: any): string => {
        
        if (value < 20) {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
        }
        else {
            return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
        }
    };

    columns: any[] =
    [
        { text: 'Book Name', columngroup: 'BookDetails', datafield: 'BookName', width: 250 },
        { text: 'Quantity', columngroup: 'BookDetails', datafield: 'Quantity', cellsalign: 'right', align: 'right' },
        { text: 'Total Price', columngroup: 'BookDetails', datafield: 'total', align: 'right', cellsalign: 'right', cellsformat: 'c2' }
    ];

    columngroups: any[] =
    [
        { text: 'Cart Details', align: 'center', name: 'BookDetails' }
    ];

    //on Destroy unsubsribe .
    ngOnDestroy(): void {
      
    }
}
