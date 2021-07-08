import { Injectable, Output, EventEmitter } from '@angular/core';   
import { Subject, BehaviorSubject } from 'rxjs'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfimDialogBoxComponent } from "../app/web/common/confim-dialog-box/confim-dialog-box.component";


@Injectable()
export class Globals {
    @Output() profileTypeOption :EventEmitter<any> = new EventEmitter();

	currencyAlias = "Rs. ";
	isItemsEditable: boolean = false; 
    editable: boolean = true; 
    isAdminToken: any ="21232f297a57a5a743894a0e4a801fc3";
    isManagerToken: any ="1d0258c2440a8d19e716292b231e3190"; 
    isManager: boolean = false;
    maxProductImages: number = 5;
    starRating: number = 5;

    defaultQueryParams = { 
        results: '10', 
        index: '1',
        sort_by: '1',
        sort_by_service_area: '1',
        area: '-1'
   };
    
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


    unitList = [
        {id: "1", text: "Piece"},
        {id: "2", text: "Unit"},
        {id: "3", text: "Sq. Ft"},
        {id: "4", text: "Sq. Meter"},
        {id: "5", text: "Block"},
    ]
  
    itemsEditable: Subject<boolean> = new Subject<boolean>();
    
    private profileTypeData = new BehaviorSubject(-1);
    getProfileTypeData = this.profileTypeData.asObservable();

    setProfileTypeData(message: number) {
        this.profileTypeData.next(message)
    }

    constructor( public confirmBox: MatDialog )  {  

     	this.itemsEditable.subscribe((value) => {
            this.isItemsEditable = value;
            console.log(value)
            
        });
 
    } 


    isManagerLogin(){

        if(this.isManagerToken == JSON.parse(localStorage.getItem('tokenAdmin')).provider_id){
            return  true;
        }else{
            return false;
        }
    
    }
    
    confirmDialogBox(data): any{  
        return this.confirmBox.open(ConfimDialogBoxComponent, {
            width: '450px',
            data: data  
        });
    }
 
}