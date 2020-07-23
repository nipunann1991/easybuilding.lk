import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../../admin/api/frontend/profile.service";
import { Globals } from "../../../../app.global";
import { environment } from "../../../../../environments/environment";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None 
})

export class ProjectsComponent implements OnInit {

  @Input() itemLimit: number; 
  profileData: any = {};
  companyId: any = "";
  clientId: any = "";
  project: any = "";
  imageURL: string = "";
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myaccount: MyAccountService,
    private profile: ProfileService,
    private globals: Globals,
  ) { 
    

  }

  ngOnInit(): void { 
    this.getProfileDetails(); 
  }


  getProfileDetails(){   
    let limit = 0;

    this.profile.userProfileData.subscribe(data => { 
      this.profileData = data; 
      this.clientId  = this.profileData.client_id;  
      this.companyId = this.profileData.company_id;  

      console.log(this.profileData)

      this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyId +'/projects/thumb/';

      ( typeof this.itemLimit === 'undefined' )?  limit = -1 : limit = this.itemLimit  ; 
      //this.profile.setfullScreenView(false);

      this.getMinimalProjectDetails( this.companyId, limit );
     
    });

    
    
    
  }



  getMinimalProjectDetails(company_id, limit){

    let params = { company_id: company_id, limit: limit }

    this.myaccount.getMinimalProjectDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {
          
          console.log( response.data ) 

          this.project = response.data
          this.isEdit = this.profileData.profile_editable;

        }else{
          
        }
          
      });

  }

}
