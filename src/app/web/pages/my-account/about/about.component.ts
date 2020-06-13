import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  profileData: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myaccount: MyAccountService,
  ) { }

  ngOnInit(): void {

    window.scroll(0,0); 
    let params = {id: 'me', provider_id: 0 };
    this.getProfileDetails(params);  
  }


  getProfileDetails(routeParams){  

    if(routeParams.id== 'me' && routeParams.provider_id == "0" ){

      this.myaccount.getProfileDetails() 
        .subscribe((response: any) => {
          if (response.status == 200) {
            
            this.profileData = response.data[0];   
            this.profileData.profile_editable = true;
            this.profileData.is_editable_btn = false; 
 

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

}
