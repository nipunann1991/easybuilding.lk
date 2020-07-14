import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { Globals } from "../../../../app.global";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  profileData: any = {};
  companyId: any = "";
  clientId: any = "";
  project: any = "";

  imageURL: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myaccount: MyAccountService,
    private globals: Globals,
  ) { }

  ngOnInit(): void {

    window.scroll(0,0); 
    let params = {id: 'me', provider_id: 0 };
    this.getProfileDetails(params);  
    
  }


  getProfileDetails(routeParams){  

    if(routeParams.id== 'me' && routeParams.provider_id == "0" ){


      const promise = new Promise((resolve, reject) => { 
      
        this.myaccount.getProfileDetails()
          .toPromise()
          .then((response: any) => {
            
            if (response.status == 200) {  
              
              this.profileData = response.data[0];    
              this.profileData.profile_editable = true;
              this.profileData.is_editable_btn = false; 
              this.clientId  = this.profileData.client_id;  
              this.companyId = this.profileData.company_id;  

              this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyId +'/projects/thumb/';
              
              this.getMinimalProjectDetails( this.companyId );

            }else{

                
            } 

              resolve();
          },
            err => { 
              reject(err);
            }

          );

      });
 

    }else{

      let params = {client_id: routeParams.id, provider_id: routeParams.provider_id }

      this.myaccount.getCustomProfileDetails(params) 
        .subscribe((response: any) => {
          if (response.status == 200 && response.data.length > 0 ) {
            
            this.profileData = response.data[0];   
            this.profileData.profile_editable = false;
            

          }else{
            
          }
            
        });

    } 
    
  }


  getMinimalProjectDetails(company_id){

    let params = { company_id: company_id }

    this.myaccount.getMinimalProjectDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {
          
          console.log( response.data ) 

          this.project = response.data

        }else{
          
        }
          
      });

  }

}
