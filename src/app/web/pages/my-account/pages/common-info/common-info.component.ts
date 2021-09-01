import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../services/my-account.service';

@Component({
  selector: 'app-common-info',
  templateUrl: './common-info.component.html',
  styleUrls: ['./common-info.component.scss']
})
export class CommonInfoComponent implements OnInit {

  @Input() profileData: any;
  serviceAreas: any = "";
  profileCompleted: boolean = false;
  services: any = "";
  products: any = "";
  
  constructor(
    private myaccount: MyAccountService,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void { 
    this.getOtherProfileRelatedData();
  }

  getOtherProfileRelatedData(){
    if(this.profileData.all_island == "1"){
      this.serviceAreas = "All Island Service";
    }else{ 
      this.getServiceCitiesByCompany( this.profileData.company_id);
      this.getServiceDistrictsByCompany( this.profileData.company_id);
    }

    this.getServics( this.profileData.company_id);  
 
  }

  getServiceCitiesByCompany(company_id){

    let params = { company_id: company_id }

    this.myaccount.getServiceCitiesByCompany(params) 
        .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {  
            this.serviceAreas = response.data;
            
        }else{
        
        }
          
      });
  }


   getServiceDistrictsByCompany(company_id){

    let params = { company_id: company_id }

    this.myaccount.getServiceDistrictsByCompany(params) 
        .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {  
            this.serviceAreas = response.data;
            
        }else{ 
        }
          
      });
  }

  getServics(company_id){

    let params = { company_id: company_id }

      this.myaccount.getServics(params) 
        .subscribe((response: any) => {
          
        if (response.status == 200 ) {  
          this.services = response.data.services.split(",");  
          this.products = response.data.products.split(","); 
          
        }else{
          
        }
          
      });
  }

}
