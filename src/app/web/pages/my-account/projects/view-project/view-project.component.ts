import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../../../admin/api/frontend/profile.service";
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  projectData: any = "";
  companyID:any;
  projectID:any;
  clientId:any;
  projectImages:any = [];
  imageURLThumb: string = "";
  imageURL: string = "";
  mainImg: string = "";

  constructor(
    private route: ActivatedRoute,
    private myaccount: MyAccountService,
    private profile: ProfileService,
  ) { 
    this.profile.setfullScreenView(true);
  }

  ngOnInit(): void {
    window.scroll(0,0); 
    this.companyID = this.route.snapshot.params.company_id;
    this.projectID = this.route.snapshot.params.project_id; 
    this.getProjectDetails(this.companyID, this.projectID);
     
  }

  getProjectDetails(company_id, project_id){

    let params = { company_id: company_id, project_id: project_id }

    this.myaccount.getProjectDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) { 
         
          this.projectData = response.data[0];
          this.projectImages = JSON.parse(response.data[0].images);
          this.clientId = response.data[0].client_id;
          this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/';
          this.imageURLThumb = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/thumb/';

          this.mainImg = this.imageURL + response.data[0].primary_img;
        
          

        }else{
          
        }
          
      });

  }

  viewImage(i){
    this.mainImg = this.imageURL + this.projectImages[i];
    
  }

  goBack(){ 
    window.history.back();
  }

}
