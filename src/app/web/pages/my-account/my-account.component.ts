import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { AuthService as OAuth } from "angularx-social-login";
import { Globals } from "../../../app.global"
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { MyAccountService } from '../../../admin/api/frontend/my-account.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  @Input() getRouterParams: any = {};
  isEditableMode: boolean = false;
  isAdminAccessible: boolean = false;
  profileData: any = {};
  profileCompleted: boolean = false;
  navItems: any = [];
  
  constructor(
    private oauth: OAuth,
    private auth: Auth,
    private router: Router,
    private globals: Globals,
    private myaccount: MyAccountService,
    private route: ActivatedRoute

  ) {  

     
  }

  ngOnInit(): void {

    this.navItems = [
      { title: "Home", url: "/my-account/user/me/0", icon: ""},
      { title: "Account Information", url: "account-info", icon: ""},
      { title: "Contact Details", url: "contact-info", icon: ""},
      { title: "Services & Areas", url: "services", icon: ""},
      { title: "Settings", url: "settings", icon: ""},
      
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
      
    this.router.events.subscribe((event) => {
       
      if (event instanceof NavigationEnd) {
        if(event.url === '/my-account/user/me/0'){
          window.scroll(0,0); 
          this.isEditableMode = false;
          let params = {id: 'me', provider_id: 0 };
          this.getProfileDetails(params); 
          
        }
      }
    });
    
  }

  onOpen($event){
    console.log($event)
  }
 
  getProfileDetails(routeParams){ 

    if(routeParams.id== 'me' && routeParams.provider_id == "0" ){

      this.myaccount.getProfileDetails() 
        .subscribe((response: any) => {
          if (response.status == 200) {
            
            this.profileData = response.data[0];   
            this.profileData.profile_editable = true;
            this.profileData.is_editable_btn = false;
             
            console.log(this.profileData)

            if(this.profileData.steps < 4){
              this.router.navigate(['steps/account-info'], { relativeTo: this.route.parent });
            }else{
              this.profileCompleted = true; 
            }

          }else{
            
          }
            
        });

    }else{

      let params = {client_id: routeParams.id, provider_id: routeParams.provider_id }

      this.myaccount.getCustomProfileDetails(params) 
        .subscribe((response: any) => {
          if (response.status == 200 && response.data.length > 0 ) {
            
            this.profileData = response.data[0];   
            this.profileData.profile_editable = false;
            

          }else{
            //this.router.navigate(['/my-account/user/me/0']);
          }
            
        });

    }
    
    
  }

  onGetCourseversionID(value){ 
    this.isEditableMode = value;
    this.router.navigate(['/my-account/user/me/0/account-info']);

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
