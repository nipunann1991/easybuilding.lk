import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { ClientsService } from '../../../api/clients.service'; 
import { MyAccountService } from '../../../api/frontend/my-account.service'; 
import { ToastrService } from 'ngx-toastr';
import { MatCheckbox } from '@angular/material/checkbox';
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
  isFeaturedVal:number = 0;
  isBlacklistVal:number = 0;
  clientID: number
  companyID: number
  routeParams: any;
  isProfileByAdmin: boolean = false;
  
  constructor(
    private route: ActivatedRoute, 
    private myaccount: MyAccountService,
    private router: Router,
    private clients: ClientsService,
    private toastr: ToastrService,
  ) {  

    this.route.params.subscribe( (routeParams) =>  {  
      window.scroll(0,0);    
      this.routeParams = routeParams;
      this.isFeaturedProfile(this.routeParams);  
      this.clientID = this.routeParams.user; 
    });
 
  }
    
  ngOnInit(): void {
 
    
  }

  backToClients(){
    this.router.navigate(['/admin/users']);
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
          
          console.log(response.data[0].status, this.isBlacklisted);

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

  setBlacklisted(event){ 
     
    let dialog_text = ""

    if(event.checked){
      dialog_text = "Are you sure you need to blacklist this account?"
    }else{
      dialog_text = "Are you sure you need to undo this account from blacklist ?"
    }

    const that = this;
    let dialog = bootbox.confirm({
      title: "Blacklist Account",
      message: dialog_text,
      buttons: {
        confirm: {
          label: 'Yes',  
          className: 'btn-danger pull-left'
        },
        cancel: {
          label: 'No', 
          className: 'pull-right '
        }
      },
      callback: function (result) {
        
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
      } 
    });

    dialog.init(function(){
      $('html .modal-backdrop:not(:first)').remove();
    })

    dialog.on("shown.bs.modal", function() {  
      $('html .bootbox.modal:not(:first)').remove(); 
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
         this.router.navigate(['admin/users/create-profile/steps/account-info']); 

        }else{
            console.log(response)
        }
           
    });  
   
 }


 openDeleteProfileModal(){ 
    const component = this;
    let dialog = bootbox.confirm({
      title: "Delete Profile",
      message: "Are you sure you need to delete this profile?",
      buttons: {
        confirm: {
          label: 'Yes',  
          className: 'btn-danger pull-left'
        },
        cancel: {
          label: 'No', 
          className: 'pull-right '
        }
      },
      callback: function (result) {
        
        if(result){
          component.deleteProfile(component.clientID);
        }  
      } 
    });

    dialog.init(function(){
      $('html .modal-backdrop:not(:first)').remove();
    })

    dialog.on("shown.bs.modal", function() {  
      $('html .bootbox.modal:not(:first)').remove(); 
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
