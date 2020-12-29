import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { AuthService as OAuth } from "angularx-social-login";
import { Globals } from "../../../app.global"
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { MyAccountService } from '../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../admin/api/frontend/profile.service";
import { environment } from "../../../../environments/environment";
import { map, filter } from "rxjs/operators";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['../my-account/my-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PublicProfileComponent implements OnInit {

  @Input() getRouterParams: any = {};
  isEditableMode: boolean = false;
  isAdminAccessible: boolean = false;
  profileData: any = {};
  profileCompleted: boolean = false;
  isPublicProfile: boolean = false;
  isFullScreen: boolean = false;
  isAdmin: boolean = false;
  serviceAreas: any = "";
  services: any = "";
  products: any = "";
  navItems: any = [];
  baseurl = "/my-account/user/me/";
  baseurlEdit = this.baseurl+"/edit/";
  _routeListener: any;

  constructor(
    private oauth: OAuth,
    private auth: Auth,
    private router: Router,
    private globals: Globals,
    private myaccount: MyAccountService,
    private profile: ProfileService,
    private route: ActivatedRoute
  ) { 
 

    this._routeListener = this.router.events.subscribe((event) => {
       
      if (event instanceof NavigationEnd) {   

          this.isFullScreen = false;

          if(this.router.url.includes("admin")){
            this.isAdmin = true; 
          } 
 
        if(event.url === environment.profileUrl){   
          this.isEditableMode = false;
          let params = {user: 'me'};  
          this.getProfileDetails(params);  
          
        }else{ 

          if(event.url.indexOf('/edit/') > -1 ){
            this.isEditableMode = true;  
            window.scrollTo(0,250)
            this.profileData.is_editable_btn = false; 
            let params = {user: 'me' };  
            this.getProfileDetails(params);  

          }else{ 
            
            if(event.url.indexOf('/view-project/') > -1 ){
              this.isFullScreen = true;
            }

            this.isEditableMode = false; 
            this.profileData.is_editable_btn = false;
            
          } 
        }  
      }
    });

  }

  ngOnInit(): void { 

    
  
    this.navItems = [
      { title: "Home", url: this.baseurl+"about", icon: ""},
      { title: "Account Information", url: this.baseurlEdit+"account-info", icon: ""},
      { title: "Contact Details", url: this.baseurlEdit+"contact-info", icon: ""},
      { title: "Services & Areas", url: this.baseurlEdit+"service-areas", icon: ""},
      { title: "Settings", url: this.baseurlEdit+"settings", icon: ""}
    ];
    
    this.isAdminAccessible = this.auth.validateBackendUser();
    
    if(this.route.params !== null){
      
      this.route.params.subscribe( (routeParams) =>  {  
        window.scroll(0,0);  
        this.getProfileDetails(routeParams);   
      });

    }else{
      window.scroll(0,0); 
      this.getProfileDetails(this.getRouterParams);  
      
    } 

  
  }
 
  ngOnDestroy() { 
    this._routeListener.unsubscribe();
  }

  onOpen($event){
    console.log($event)
  }
 
  getProfileDetails(routeParams){ 
      
    let params = {client_id: routeParams.user, provider_id: routeParams.provider_id }

    this.myaccount.getCustomProfileDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) { 
          this.profileData = response.data[0];   
          this.profileData.profile_editable = false;
          this.isPublicProfile = true; 
          this.profile.setProfileData(this.profileData); 
       
          this.getOtherProfileRelatedData();

        }else{
          //this.router.navigate(['/my-account/user/me/0']);
        }
          
      }); 
     
    
  }

  isProfileEditable(value){ 
    this.isEditableMode = value; 
  }

  setLargeImg(){
    
    switch (this.profileData.provider) {
      case 'F': 
        let img = this.profileData.profie_image.split('picture?type=normal');
        this.profileData.profie_image = img[0]+"picture?type=large";  
        break;
      
      case 'G':
        let img1 = this.profileData.profie_image.split('s96-c');
        this.profileData.profie_image = img1[0]+"s200-c"; 
        break;
    
      default:
        break;
    }
  }


  getOtherProfileRelatedData(){
    if(this.profileData.all_island == "1"){
      this.serviceAreas = "All Island Service"; 

    }else{ 
      this.getServiceCitiesByCompany( this.profileData.company_id);
      this.getServiceDistrictsByCompany( this.profileData.company_id); 

    } 

    this.getServics( this.profileData.company_id);  

    if(!this.isAdmin){

      if(this.profileData.steps < 4 && this.profileData.company_profile !== '0' ){
        this.profileCompleted = false;
        this.router.navigate(['/steps/account-info'], { relativeTo: this.route.parent });
      }else{
        this.profileCompleted = true;     
      }

    }else{
      
    }

    
  }

  getServiceCitiesByCompany(company_id){

    let params = { company_id: company_id }

    this.myaccount.getServiceCitiesByCompany(params) 
        .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {  
            this.serviceAreas = response.data;
            
        }else{
          //this.router.navigate(['/my-account/user/me/0']);
        }
          
      });
  }


   getServiceDistrictsByCompany(company_id){

    let params = { company_id: company_id }

    this.myaccount.getServiceDistrictsByCompany(params) 
        .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {  
            this.serviceAreas = response.data;
            
        }else{
          //this.router.navigate(['/my-account/user/me/0']);
        }
          
      });
  }

  getServics(company_id){

    let params = { company_id: company_id }

      this.myaccount.getServics(params) 
        .subscribe((response: any) => {
          
        if (response.status == 200 ) {  
          this.services = response.data.services;  
          this.products = response.data.products;  
          
        }else{
          
        }
          
      });
  }

  signOut(): void {
    this.oauth.signOut().then( (userDetails) =>{  
        localStorage.clear();  
        window.location.href = "login"; 

    }).catch((e)=>{
        localStorage.clear();  
        window.location.href = "login";
    });    
  }

}
