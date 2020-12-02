import { Component, OnInit, ViewEncapsulation, Input,  ElementRef, ViewChild, HostListener} from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../../admin/api/frontend/profile.service";
import { Globals } from "../../../../app.global";
import { environment } from "../../../../../environments/environment";
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class ProductsComponent implements OnInit {

  @Input() itemLimit: number; 
  profileData: any = {};
  companyId: any = "";
  clientId: any = "";
  product: any = "";
  imageURL: string = "";
  isEdit: boolean = false;
  isProductsAvailable: boolean = false;

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

      this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyId +'/products/thumb/';

      ( typeof this.itemLimit === 'undefined' )?  limit = -1 : limit = this.itemLimit  ; 
      
    });

    this.getMinimalProductDetails( this.companyId, limit );
  
  }


  getMinimalProductDetails(company_id, limit){

    this.product = [];
    let params = { company_id: company_id, limit: limit }

    this.myaccount.getMinimalProductDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {  
          this.product = response.data
          this.isProductsAvailable = true;
         
        } if (response.status == 200 && response.data.length == 0 ) { 
          this.product = [];
          this.isProductsAvailable = false;

        }else {
          
        }
          
    });

  }

 
  deleteProduct(index, company_id, product_id){

    let params = { company_id: company_id, product_id: product_id }; 

    this.myaccount.deleteProduct(params) 
      .subscribe((response: any) => {
        if (response.status == 200 && response.data.length > 0 ) {

          if (response.status == 200) { 
            
            this.toastr.success('Project deleted successfully', 'Success !');  
            
            let limit = 0;
            ( typeof this.itemLimit === 'undefined' )?  limit = -1 : limit = this.itemLimit  ; 
            this.product.splice(index, 1); 
            this.getMinimalProductDetails( this.companyId, limit );
           
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Project delete failed. Please try again', 'Error !'); 
          }
           
        }else{
          
        }
          
    });
     
  }

}
