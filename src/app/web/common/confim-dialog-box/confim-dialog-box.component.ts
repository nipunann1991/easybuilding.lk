import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confim-dialog-box',
  templateUrl: './confim-dialog-box.component.html',
  styleUrls: ['./confim-dialog-box.component.css']
})
export class ConfimDialogBoxComponent implements OnInit {

  popupData: any; 
  isDelete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfimDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfimDialogBoxComponent) {
      this.popupData = data;  
      this.isDelete = data.isDelete;

      console.log(this.popupData, this.isDelete)
    }


  ngOnInit(): void {
    
  }
 
  onConfirm(): void { 
    this.dialogRef.close(true);
  }

  onDismiss(): void { 
    this.dialogRef.close(false);
  }

}
