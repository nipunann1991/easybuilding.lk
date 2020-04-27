import { Injectable, Output, EventEmitter } from '@angular/core';   
import { Subject } from 'rxjs/Subject'


@Injectable()
export class Globals {

	currencyAlias = "Rs. ";
	isItemsEditable: boolean = false; 
	editable: boolean = true; 
    token: any = {
        auth_token: '',
        provider_id: ''
    }

    user: any = {
        first_name: '',
        profie_image: ''
    }
 

    itemsEditable: Subject<boolean> = new Subject<boolean>();

     constructor()  { 

     	// if (localStorage.getItem("editableMode") != null) {
	    //     this.isItemsEditable = this.editable = (localStorage.getItem("editableMode") == 'true');   ;
	         
	    // }

     	this.itemsEditable.subscribe((value) => {
            this.isItemsEditable = value;
            console.log(value)
            //localStorage.setItem('editableMode', this.isItemsEditable.toString() );
        });

        //this.voted.emit(true);
   
    }

    

	
       

	

}