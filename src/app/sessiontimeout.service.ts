import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ModalpopupComponent} from './modalpopup/modalpopup.component';

@Injectable({
  providedIn: 'root'
})
export class SessiontimeoutService {

  constructor(private idle: Idle, private keepalive: Keepalive,private router:Router,private modalservice:NgbModal) 
  { 
     this.init();
  }
  reset():void{
    this.idle.watch();
  }

  close():void{
    this.idle.onTimeout.unsubscribe();
  }

  init(): void{
    this.idle.setIdle(60);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.setTimeout(10);
    this.idle.onTimeout.subscribe(()=>{
          //open modal to say that session time please relogin again.
          const modalref = this.modalservice.open(ModalpopupComponent);
          modalref.componentInstance.title = "session Expired";
          modalref.componentInstance.body = "Session Timeout, please login again";
          modalref.componentInstance.modaltype = "1";
          modalref.componentInstance.dialogId = 1;
        });
        this.keepalive.interval(15);
        this.reset();
  }
}
