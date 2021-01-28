import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { AuthService as OAuth } from "angularx-social-login";
import { Globals } from "../../../app.global"
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { MyAccountService } from '../../../admin/api/frontend/my-account.service';
import { ClientsService } from '../../../admin/api/clients.service';  
import { ProfileService } from "../../../admin/api/frontend/profile.service";
import { environment } from "../../../../environments/environment";
import { map, filter } from "rxjs/operators";
import { AppSEO } from "./../../../app.seo"; 


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
    private clients: ClientsService,
    private myaccount: MyAccountService,
    private profile: ProfileService,
    private route: ActivatedRoute,
    private seo: AppSEO
  ) { 
 

    this._routeListener = this.router.events.subscribe((event) => {
       
      if (event instanceof NavigationEnd) {   

          this.isFullScreen = false;
          //window.scroll(0,0);
         
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
              
            if((event.url.indexOf('/view-project/') > -1 ) || (event.url.indexOf('/edit-project/') > -1 ) || (event.url.indexOf('/edit-product/') > -1 ) || (event.url.indexOf('/upload-project/') > -1 ) || (event.url.indexOf('/upload-product/') > -1 )){
              this.isFullScreen = true;
            }

            if(this.router.url.includes("admin")){
              this.getProfileDetails(this.route.snapshot.params, true);  
              this.isAdmin = true; 
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
        (routeParams.user == 'me' || !this.router.url.includes("admin") )? this.getProfileDetails(routeParams): this.getProfileDetails(routeParams, true);
      });

    }else{ 
      
      this.getProfileDetails(this.getRouterParams);   
    } 

  
  }
 
  ngOnDestroy() { 
    this._routeListener.unsubscribe();
  }

  onOpen($event){
    console.log($event)
  }
 
  getProfileDetails(routeParams, admin_profile = false){ 
      
    let params = {client_id: routeParams.user, provider_id: routeParams.provider_id }

    this.myaccount.getCustomProfileDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) { 
          this.profileData = response.data[0];   
          this.profileData.profile_editable = false;
          this.profileData.admin_profile = admin_profile; 

          (this.profileData.admin_profile)? this.editClent(): "";

          console.log(this.profileData);

          this.isPublicProfile = true; 
          this.profile.setProfileData(this.profileData);  
          this.getOtherProfileRelatedData();
          this.pageSEO();  

        }else{
          
        }
          
      }); 
     
    
  }

  isProfileEditable(value){ 
    this.isEditableMode = value; 
  }


  editClent(){

    let param = {client_id: this.route.snapshot.params.user, provider_id: this.route.snapshot.params.provider_id }
    
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

        }else{
            console.log(response)
        }
           
    });  
   
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

  pageSEO() : void{
    let seoData = {
      title: 'EasyBuilding.lk | '+ this.profileData.display_name,
      keywords:  this.services +","+ this.products,
      description: this.profileData.description,
      image: environment.uploadPath+''+this.profileData.client_id+'/'+this.profileData.company_id+'/'+this.profileData.profie_image,
      
    }

    this.seo.setSEOData(seoData)
  }

}
