import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { ClientsService } from '../../../api/clients.service'; 
import { MyAccountService } from '../../../api/frontend/my-account.service'; 
import { ToastrService } from 'ngx-toastr';
import { MatCheckbox } from '@angular/material/checkbox';
import { Globals } from "../../../../app.global";
import * as $ from 'jquery';

declare const bootbox:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  @ViewChild('blacklisted_cb') private blacklisted_cb: MatCheckbox;

  routerParams:any = {};
  isFeatured:boolean = false;
  isBlacklisted:boolean = false;
  isPersonalProfile:boolean = false;
  forProfileOnly:boolean = true;
  isFeaturedVal:number = 0;
  isFeaturedProcuctVal:number = 0;
  isBlacklistVal:number = 0;
  clientID: number;
  companyID: number; 
  routeParams: any;
  isProfileByAdmin: boolean = false;
  isFeaturedProduct: boolean = false;
  productID: number;
  isManager: boolean = this.globals.isManagerLogin();
  
  constructor(
    private route: ActivatedRoute, 
    private myaccount: MyAccountService,
    private router: Router,
    private location: Location,
    private clients: ClientsService,
    private toastr: ToastrService,
    private globals: Globals,
  ) {  

    this.route.params.subscribe( (routeParams) =>  {  
      window.scroll(0,0);    
      this.routeParams = routeParams;
      this.isFeaturedProfile(this.routeParams);  
      this.clientID = this.routeParams.user;  
    }); 

    this.router.events.subscribe((event) => {
       
      if (event instanceof NavigationEnd) {  

          if((event.url.indexOf('/view-project/') > -1 ) || (event.url.indexOf('/view-product/') > -1 ) || (event.url.indexOf('/edit-project/') > -1 ) || (event.url.indexOf('/edit-product/') > -1 ) || (event.url.indexOf('/upload-project/') > -1 ) || (event.url.indexOf('/upload-product/') > -1 )){
             this.forProfileOnly = false;
             let routeURL = event.url.split('/');
             this.productID = parseInt(routeURL[routeURL.length - 1]); 
 
             this.getProductData(event);
             
          }else{
            this.forProfileOnly = true;
          }  
      }

    });
     
  }
    
  ngOnInit(): void {
     
    
  }

  backToClients(){
    this.location.back();
  }
  

  getProductData(event){
    let data =  event.url.split('/')

    this.companyID = parseInt(data[data.length - 2]);
    this.productID = parseInt(data[data.length - 1]);  
    this.isFeaturedProductData();

  }

  isFeaturedProfile(routeParams){ 
      
    let params = {client_id: routeParams.user, provider_id: routeParams.provider_id }

    this.clients.isFeaturedProfile(params) 
      .subscribe((response: any) => {
        if (response.status == 200 ) { 
          
          this.companyID = response.data[0].company_id;
          (response.data[0].featured == 1)? this.isFeatured = true  : this.isFeatured = false; 
          (response.data[0].status == 0)? this.isBlacklisted = true  : this.isBlacklisted = false; 
          (response.data[0].company_profile == 0)? this.isPersonalProfile = true  : this.isPersonalProfile = false; 
          (response.data[0].first_name == "Admin")? this.isProfileByAdmin = true  : this.isProfileByAdmin = false; 
        

        }else{ 
          
        } 
          
      }); 
      
  }


  isFeaturedProductData(){

    let params = {company_id: this.companyID, product_id: this.productID }

    this.clients.isFeaturedProduct(params) 
      .subscribe((response: any) => {
        if (response.status == 200 ) { 
           
          (response.data[0]?.featured == 1)? this.isFeaturedProduct = true : this.isFeaturedProduct = false;
           
        }else{ 
          
        } 
          
      }); 

  }

  setFeatured(event){
    (event.checked)? this.isFeaturedVal = 1:  this.isFeaturedVal = 0 ;

    let params = {
      client_id: this.clientID,
      company_id: this.companyID,
      featured: this.isFeaturedVal
    }

    this.updateProfileDetails(params);
  }
  

  setFeaturedProduct(event){
    (event.checked)? this.isFeaturedProcuctVal = 1:  this.isFeaturedProcuctVal = 0 ;

    let params = { 
      product_id: this.productID,
      featured: this.isFeaturedProcuctVal
    }

    this.clients.editProductDetails(params)
        .subscribe((response: any) => {

          if (response.status == 200) {  
            this.toastr.success('Product updated', 'Success !');  
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  

          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 

          }
        });
  }

  setBlacklisted(event){ 
     
    let dialog_text = ""
    let btn_text = ""

    if(event.checked){
      dialog_text = "Are you sure you need to blacklist this account?"
      btn_text = "Blacklist"
    }else{
      dialog_text = "Are you sure you need to undo this account from blacklist ?"
      btn_text = "Undo Blacklist"
    }

    const that = this;
    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Blacklist Account", 
      message: dialog_text, 
      isDelete: true,
      confirmBtn: "Yes, "+btn_text,
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
      if(result){ 
        that.isBlacklisted = event.checked;  

        if(event.checked){
          that.isBlacklistVal = 0  
          that.isFeatured = false; 
        }else{
          that.isBlacklistVal = 1 ; 
        } 

        let params = {
          client_id: that.clientID,
          company_id: that.companyID,
          featured: that.isFeaturedVal,
          status: that.isBlacklistVal
        }
    
        that.updateProfileDetails(params, true);

      }else{
        that.isBlacklisted = false;
        that.blacklisted_cb.checked = false;
      }
      
    }); 
 
  }
 

  updateProfileDetails(params, blacklistedAccessed = false){ 
 

      this.clients.updateProfileDetails(params)
        .subscribe((response: any) => {

          if (response.status == 200) { 

            if(blacklistedAccessed && !this.isBlacklisted){
              this.toastr.success('Profile removed from blacklist', 'Success !');  
            }else if(blacklistedAccessed && this.isBlacklisted){
              this.toastr.error('Profile marked as blacklisted', 'Success !');  
            }
             
            if(!blacklistedAccessed && this.isFeaturedVal == 1){
              this.toastr.success('Profile marked as a Featured Profile', 'Success !');  

            }else if(!blacklistedAccessed && this.isFeaturedVal == 0){
              this.toastr.success('Profile removed from Featured Profile', 'Success !');  

            }
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  

          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 

          }
            
        });
     
  }


  editClent(){

    let param = {client_id: this.routeParams.user, provider_id: this.routeParams.provider_id }
    
    this.clients.getProfileToken(param)
        .subscribe((response: any) => {

       if (response.status == 200) { 

         let tokenUser = { 
           auth_token: response.data[0].auth_token,
           email: response.data[0].email,
           provider_id: response.data[0].provider_id,
           session_id: response.data[0].client_id 
         }

         localStorage.removeItem("tokenUser");
         localStorage.setItem("tokenUser",  JSON.stringify(tokenUser));
         this.router.navigate(['admin/users/user/'+param.client_id+'/'+param.provider_id+'/edit/account-info']); 

        }else{
            console.log(response)
        }
           
    });  
   
 }


 openDeleteProfileModal(){ 
 
    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete Profile", 
      message: "Are you sure you need to delete this profile?", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
    
    dialogRef.afterClosed().subscribe(result => {
        
        if(result){
          this.deleteProfile(this.clientID);
        }  
      
    });  
    
  }


  deleteProfile(client_id){
 
    let param = { client_id: client_id}
    
    this.myaccount.deleteProfile(param)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('Profile has been deleted successfully', 'Success !');  
          this.router.navigate(['admin/users']); 


        }else{
            this.toastr.error('Profile deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	}

}
