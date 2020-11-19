import { Component, OnInit, ViewEncapsulation, Input,  ElementRef, ViewChild, HostListener} from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../../admin/api/frontend/profile.service";
import { Globals } from "../../../../app.global";
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None 
})

export class ProjectsComponent implements OnInit {

  private dotmenu: ElementRef;

  @Input() itemLimit: number; 
  @ViewChild('dotmenu',{static: false})  set content(content: ElementRef) {
    if(content) {
        this.dotmenu = content;
    }
  }

  profileData: any = {};
  companyId: any = "";
  clientId: any = "";
  project: any = "";
  imageURL: string = "";
  isEdit: boolean = false;
  isMenuOpen: boolean;
  isProjectsAvailable: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private myaccount: MyAccountService,
    private profile: ProfileService,
    private globals: Globals,
    private toastr: ToastrService  
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
      this.isEdit = this.profileData.profile_editable;

      this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyId +'/projects/thumb/';

      ( typeof this.itemLimit === 'undefined' )?  limit = -1 : limit = this.itemLimit  ; 
      
    });

    this.getMinimalProjectDetails( this.companyId, limit );
  
  }
 
 
  getMinimalProjectDetails(company_id, limit){

    this.project = [];
    let params = { company_id: company_id, limit: limit }

    this.myaccount.getMinimalProjectDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) { 
          this.isProjectsAvailable = true;
          this.project = response.data
         
        } if (response.status == 200 && response.data.length == 0 ) {
          this.isProjectsAvailable = false; 
          this.project = [];

        }else {
          
        }
          
    });

  }

  openProject(company_id, Project_id){
    this.router.navigate(["view-project/"+company_id+"/"+Project_id+"/"], {relativeTo: this.route.parent} ); 
  }

  deleteProject(index, company_id, project_id){

    let params = { company_id: company_id, project_id: project_id }; 

    this.myaccount.deleteProject(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {

          if (response.status == 200) { 
            
            this.toastr.success('Project updated successfully', 'Success !');  
            
            let limit = 0;
            ( typeof this.itemLimit === 'undefined' )?  limit = -1 : limit = this.itemLimit  ; 
            this.project.splice(index, 1); 
            this.getMinimalProjectDetails( this.companyId, limit );
           
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Project update failed. Please try again', 'Error !'); 
          }
           
        }else{
          
        }
          
    });
     
  }

}
