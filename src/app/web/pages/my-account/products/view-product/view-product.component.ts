import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MyAccountService } from '../../../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../../../admin/api/frontend/profile.service";
import { environment } from "../../../../../../environments/environment";
import { Globals } from "../../../../../app.global";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['../../projects/view-project/view-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewProductComponent implements OnInit {

  projectData: any = "";
  companyID:any;
  projectID:any;
  imageURLThumb: string = "";
  imageURL: string = "";
  profileImg: string = "";
  profileURL: string = "";
  mainImg: string = ""; 
  units = this.globals.unitList
  unit: string = "";
  currency = this.globals.currencyAlias;

  constructor(
    private myaccount: MyAccountService, 
    private router: Router,
    private profile: ProfileService,
    private route: ActivatedRoute,
    private location: Location,
    private globals: Globals,
  ) { 
    this.profile.setfullScreenView(true);
  }

  ngOnInit(): void {
    window.scroll(0,0); 
    this.companyID = this.route.snapshot.params.company_id;
    this.projectID = this.route.snapshot.params.project_id; 
    this.getProductDetails(this.companyID, this.projectID);

  }


  getProductDetails(company_id, product_id){

    let params = { company_id: company_id, product_id: product_id }
 
    this.myaccount.getProductDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200  ) { 
          
          console.log(response.data);

          this.projectData = response.data[0];
  
          this.imageURL = environment.uploadPath + this.projectData.client_id +'/'+ this.companyID +'/products/';
          this.imageURLThumb = environment.uploadPath + this.projectData.client_id +'/'+ this.companyID +'/products/thumb/'; 
  
          this.mainImg = this.imageURL + this.projectData.primary_img;
          this.profileImg = environment.uploadPath +  this.projectData.client_id +'/'+ this.companyID +'/'+ this.projectData.profie_image;

          this.unit = this.units[this.projectData.product_unit - 1].text
         

          if( parseInt(this.projectData.client_id)  ==  parseInt(this.globals.token.session_id)){
            this.profileURL = "/my-account/user/me/about";
          }else{
            this.profileURL = "/user/"+this.projectData.client_id+"/"+this.projectData.provider_id+"/about"; 
          }

           

        }else{
          
        }
          
      });

  }

  gotoProfile(){
    this.router.navigate([this.profileURL], { relativeTo: this.route.parent });
  }

  goBack(){ 
    window.history.back();
  }

}
