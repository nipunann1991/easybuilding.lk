import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog' 
import { ModalBoxComponent }  from './../modal-box/modal-box.component';
import * as $ from 'jquery';
 


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  @Input() public newInput;

  isActive: Boolean = false;
  userName: string = "Nipuna Nanayakkara";

  constructor(public dialog: MatDialog) { }

  ngOnInit() { 
    console.log(this.userName, this.isActive);
  	 
  }

  clickToAdd(): void { 
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalBoxComponent, {
      width: '450px',
      data: {title: "Delete Item", message: "Are you sure you want to delete this Item?"} 
    });

    $("html #yes").click(function(){
		  alert("123");
	  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       
    });
  }

   
}

