import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {

  @Input() title;

  @Input() body;

  @Input() modaltype;

  @Input() dialogId;

  

  ngOnInit() {
  }

  constructor(private activeModal: NgbActiveModal, private router:Router) {
        
  }

  ok() : void
  {
    this.activeModal.close();
    //call api if required.
    this.router.navigate(['logout']);
  }
  
  Yes():void
  {
    
     this.activeModal.close();
  }
  
  No():void
  {
     this.activeModal.close();
     //nothing to do.
  }
}
