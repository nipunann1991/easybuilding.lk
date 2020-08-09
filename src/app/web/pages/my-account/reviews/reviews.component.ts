import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {

  dialogRef: MatDialogRef<reviewDialog>;

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  reviewDialog(){
    this.dialogRef =  this.dialog.open(reviewDialog, {
      height: '170px',
      width: '400px', 
    });  

    this.dialogRef.afterClosed().subscribe(result => {

      console.log(result)
      
      if(result){
         
      }
      
    });
  }

}



@Component({
  selector: 'review-dialog',
  templateUrl: './review-dialog.html',
  styleUrls: ['./reviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class reviewDialog {
     
  constructor( 
    public dialogRef: MatDialogRef<reviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  public confirmMessage:string;
  
}
