import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmdialogComponent implements OnInit {
  
  message : string;

  showOk : boolean;

  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.message = this.data.message;
    this.showOk = this.data.okbutton;
  }

  onNoClick(){
    this.dialogRef.close({response:'0'});
  }
  
  onYesClick()
  {
    this.dialogRef.close({response:'1'});
  }

}
