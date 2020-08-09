import { Component, OnInit, Inject, Injectable, EventEmitter  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog' 
 
export interface DialogData {
  title: '',
  message: '', 
}

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.scss']
})

@Injectable()
export class ModalBoxComponent{

	  invokeFirstComponentFunction = new EventEmitter();

	//protected dialogRef: MatDialogRef<ModalBoxComponent>
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
  // 
  // clickMe(): any {
  //    this.invokeFirstComponentFunction.emit();    
  //    return 1;
  // }

  // getValue(){
  // 	return 1
  // }

  
}
