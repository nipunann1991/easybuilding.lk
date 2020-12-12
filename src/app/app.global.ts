import { Injectable, Output, EventEmitter } from '@angular/core';   
import { Subject } from 'rxjs'


@Injectable()
export class Globals {

	currencyAlias = "Rs. ";
	isItemsEditable: boolean = false; 
    editable: boolean = true; 
    isAdminToken: any ="21232f297a57a5a743894a0e4a801fc3";
    isManagerToken: any ="1d0258c2440a8d19e716292b231e3190";
    token: any = {
        auth_token: '',
        provider_id: '',
        session_id: ''
    }

    tokenAdmin: any = {
        auth_token: '',
        provider_id: ''
    }
 
    user: any = {
        first_name: '',
        profie_image: ''
    }

    userAdmin: any = {
        first_name: '',
        profie_image: ''
    }
 

    itemsEditable: Subject<boolean> = new Subject<boolean>();

     constructor()  {  

     	this.itemsEditable.subscribe((value) => {
            this.isItemsEditable = value;
            console.log(value)
            
        });

        
   
    }

    

	
       

	

}