import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../services/my-account.service';

import { ProfileService } from "../profile/services/profile.service";
import { Globals } from "../../../../../app.global";
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  @Input() itemLimit: string;

  profileData: any = {};
  companyId: any = "";
  clientId: any = "";
  project: any = "";

  imageURL: string = "";
  isPrevEdit: boolean = false;
  reviewData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myaccount: MyAccountService,
    private profile: ProfileService,
    private globals: Globals,
  ) { 

   
    
  }

  ngOnInit(): void {

    this.profile.userProfileData.subscribe(data => {
      this.profileData = data;  
    });

    this.profile.setfullScreenView(false);  
    this.reviewData = { header: false , limit: 3}

    if(this.profile.getPreviousUrl().indexOf('/me/edit/') > -1){
      this.getProfileDetails();   
    }

   
  } 


  getProfileDetails(){ 
      
    this.myaccount.getProfileDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
          
          this.profileData = response.data[0];    
          this.profileData.profile_editable = true;
          this.profileData.is_editable_btn = false; 
          this.profile.setProfileData(this.profileData);
          
         // this.getOtherProfileRelatedData();
          
        } 
          
      }); 
  
}

}
