import { Injectable } from '@angular/core';   
import { Subject } from 'rxjs/Subject'


@Injectable()
export class Globals {

	currencyAlias = "Rs. ";
	isItemsEditable: boolean; 
	editable: boolean = false;
    auth_token: any = "";
    itemsEditable: Subject<boolean> = new Subject<boolean>();

     constructor()  {

     	if (localStorage.getItem("editableMode") != null) {
	        this.isItemsEditable = this.editable = (localStorage.getItem("editableMode") == 'true');   ;
	         
	    }

     	this.itemsEditable.subscribe((value) => {
            this.isItemsEditable = value;
            localStorage.setItem('editableMode', this.isItemsEditable.toString() );
        });
   
    }

    

	
       

	

}