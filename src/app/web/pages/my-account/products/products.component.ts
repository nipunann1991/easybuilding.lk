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
  isEditAdmin: boolean = false;
  isProductsAvailable: boolean = false;
  addNewProjectURL: string = "";
  allUnits: any = this.globals.unitList;
  isShowHeader: boolean = false;
  
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
    window.scroll(0,0); 
    this.getProfileDetails();
  }


  getProfileDetails(){   
    let limit = 0;

    this.profile.userProfileData.subscribe(data => { 
      this.profileData = data; 
      this.clientId  = this.profileData.client_id;  
      this.companyId = this.profileData.company_id;   
      this.isEdit = this.profileData.profile_editable;
      this.isEditAdmin = this.profileData.admin_profile;  
       
      this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyId +'/products/thumb/';

      if(!this.isEditAdmin){
        this.addNewProjectURL = environment.profileUrl.split('/').slice(0, -1).join('/') + "/products/upload-product/"+this.companyId;  
      }else{ 
        this.addNewProjectURL = "/admin/users/user/"+this.route.snapshot.params.user+"/"+this.route.snapshot.params.provider_id+ "/products/upload-product/"+this.companyId; 
      }

       
      if( typeof this.itemLimit === 'undefined' ){
        limit = -1;
        this.isShowHeader = true;
      }else{
        limit = this.itemLimit 
        this.isShowHeader = false;

      }

    });

    this.getMinimalProductDetails( this.companyId, limit );
  
  }


  openProduct(company_id, Project_id){
    this.router.navigate(["view-product/"+company_id+"/"+Project_id+"/"], {relativeTo: this.route.parent} ); 
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

  openDeleteProduct(index, company_id, project_id){

    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete Product", 
      message: "Are you sure you need to delete the product? Please note after you proceed it can be undone.", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
        if(result){
          this.deleteProduct(index, company_id, project_id);
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
