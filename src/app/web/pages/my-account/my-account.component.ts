import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
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

  isEditableMode: boolean = false;
  isAdminAccessible: boolean = false;
  profileData: any = {};
  
  constructor(
    private oauth: OAuth,
    private auth: Auth,
    private router: Router,
    private globals: Globals,
    private myaccount: MyAccountService

  ) {  }

  ngOnInit(): void {
    this.isAdminAccessible = this.auth.validateBackendUser();
    this.getProfileDetails(); 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url === '/my-account/user'){
          this.getProfileDetails(); 
          this.isEditableMode = false;
        }
      }
    });
    
  }
 
  getProfileDetails(){ 
    
    this.myaccount.getProfileDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.profileData = response.data[0];   
          this.setLargeImg(); 

        }else{
            
        }
          
      });
  }

  onGetCourseversionID(value){ 
    this.isEditableMode = value;
    this.router.navigate(['/my-account/account-info']);

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
