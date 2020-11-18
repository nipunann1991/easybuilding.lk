import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../../../admin/api/frontend/profile.service";
import { environment } from "../../../../../../environments/environment";
import { Globals } from "../../../../../app.global";

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
  profileImg: string = "";
  profileURL: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myaccount: MyAccountService,
    private profile: ProfileService,
    private globals: Globals,
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
        if (response.status == 200  ) { 
         
          this.projectData = response.data;

          console.log(this.projectData);

          this.projectImages = JSON.parse(this.projectData.images);
          this.clientId =  this.projectData.client_id;
          this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/';
          this.imageURLThumb = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/thumb/';

          this.mainImg = this.imageURL + this.projectData.primary_img;
          this.profileImg = environment.uploadPath + this.clientId +'/'+ this.companyID +'/'+ this.projectData.profie_image;
         

          if( parseInt(this.projectData.client_id)  ==  parseInt(this.globals.token.session_id)){
            this.profileURL = "/my-account/user/me/about";
          }else{
            this.profileURL = "/user/"+this.projectData.client_id+"/"+this.projectData.provider_id+"/about"; 
          }

           

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

  gotoProfile(){
    this.router.navigate([this.profileURL], { relativeTo: this.route.parent });
  }

}
