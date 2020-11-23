import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute,  NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { Options } from 'select2'; 

@Component({
  selector: 'app-service-areas',
  templateUrl: './service-areas.component.html',
  styleUrls: ['./service-areas.component.scss']
})
export class ServiceAreasComponent implements OnInit {

  isStepsForm: boolean = false;
  all_island: boolean = false;
  profile: any = {};
  clientId: any; companyId: any;
  eventE1: any;
  isCities: boolean = true;
  isDistricts: boolean = false;
  totalLinks: number = 0;
  public value: string[];
  
  formGroup: FormGroup;
  public options: Options;

  serviceAreasCity: any = [];
  serviceAreasDistrict: any = [];
  allServices: any = [];
  allProducts: any = [];
  allServicesWithParentCategory: any = [];
  linkCount:any = [];

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({ 
      
      service_areas: new FormControl({value:[]}, [
        Validators.required
      ]), 

      services: new FormControl({value:[]}),
       
      products: new FormControl({value:[]}), 
       
    });

    this.options = {
      multiple: true, 
      closeOnSelect: true, 
      tags: true 
    };

    if(this.router.url.includes("steps")){
      this.isStepsForm = true; 
    }

   
    this.getServiceDetails();
    this.getCities();  
    this.getDistricts();
    //this.getAllCategoriesData();
    this.getServiceCategories();
    this.getProductCategories();
    this.select2Order();
  }


  getServiceDetails(){

    this.myaccount.getServiceDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.profile = response.data[0];

          console.log(this.profile);
          
          if(this.profile.service_areas != "[]" && this.profile.service_dist != "[]"){
            this.isCities = true

          }else{
            (this.profile.service_areas != "[]")? this.isCities = true :  this.isCities = false ;
            (this.profile.service_dist != "[]")? this.isDistricts = true :  this.isDistricts = false ;
            (this.profile.all_island == 1 && !this.isStepsForm)? this.all_island = true :  this.all_island = false;
          }
           

          this.clientId = this.profile.client_id;
          this.companyId = this.profile.company_id; 
           

          if(this.isDistricts){

            this.formGroup.setValue({
              service_areas: JSON.parse(this.profile.service_dist),  
              services: JSON.parse(this.profile.services),
              products: JSON.parse(this.profile.products)
            });

          }
          
          if(this.isCities){

            this.formGroup.setValue({
              service_areas: JSON.parse(this.profile.service_areas),  
              services: JSON.parse(this.profile.services),
              products: JSON.parse(this.profile.products)

            }); 

          }


          if(this.all_island){

            this.formGroup.setValue({
              service_areas: JSON.parse(this.profile.service_areas),  
              services: JSON.parse(this.profile.services),
              products: JSON.parse(this.profile.products)
            }); 

          } 
  
        }else{
            
        }
          
      });
  }

  getCities(){ 

    this.myaccount.getCities() 
      .subscribe((response: any) => {
        if (response.status == 200) { 
          this.serviceAreasCity = response.data; 
           
        }else{
            
        }
          
      });
  }

  splitWithMainCategories(dataArray){
 
    let serviceId = 0;
    let index = -1; 
     
    dataArray.forEach((element, i) => {
 
      if (serviceId != element.parent_id ) {
         
        (this.totalLinks != 0)? this.linkCount.push(this.totalLinks): "" ; 
        serviceId = element.parent_id; 
        index++;

        this.totalLinks = 0;
 
        this.allServicesWithParentCategory.push({ 
          parent_id: element.parent_id, perent_text: element.perent_text, 
          children: [{ 
            id: element.id,
            text: element.text,
            children: element.children
          }] 
        }); 
 
        this.totalLinks = this.totalLinks + element.children.length; 

      }else{

        this.allServicesWithParentCategory[index].children.push({ 
          id: element.id,
          text: element.text,
          children: element.children
        });

        this.totalLinks = this.totalLinks + element.children.length
      }  

      if(dataArray.length == (i + 1)) {
        this.linkCount.push(this.totalLinks); 
      }
 
       
    });

    console.log(this.allServicesWithParentCategory);
    console.log(this.linkCount)
    this.generateMegaMenu(this.allServicesWithParentCategory) 
    
  }



  generateMegaMenu(menuArray): any{
 
    let oldMenu = menuArray;
    let newMenu = [];  

    oldMenu.forEach((element, index) => { 
       
      let noOfItemsPerCol =  Math.round(this.linkCount[index] / 2) - 5;  
      let count = 0;
      let i = 0;
      let lvl1 = []
      newMenu.push([]);
      
      element.children.forEach((subLevel2, index2) => { 
        
        count = count + subLevel2.children.length;

        if ( count < noOfItemsPerCol && element.children.length != (index2 + 1) ) {
          lvl1.push(subLevel2); 

        }else{

          lvl1.push(subLevel2);
          newMenu[index].push(lvl1);
          i++;
          lvl1 = [];
          count = 0; 

        } 
       
      });
      
      this.allServicesWithParentCategory[index].children = newMenu[index];
      
    });
 
    return newMenu; 
    
  }
 

  getServiceCategories(){
    this.myaccount.getServiceCategories() 
      .subscribe((response: any) => {
        if (response.status == 200) { 
          this.allServices = response.data 
  
        }else{
            
        }
          
      });
  }

  getProductCategories(){
    this.myaccount.getProductCategories() 
      .subscribe((response: any) => {
        if (response.status == 200) { 
          this.allProducts = response.data 
  
        }else{
            
        }
          
      });
  }


  getDistricts(){ 

    this.myaccount.getDistricts() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.serviceAreasDistrict = response.data;  
  
        }else{
            
        }
          
      });
  }

  checkBoxChange(event){
    
    if(event.srcElement.checked){
      
     
      this.formGroup.value.services.push(event.srcElement.defaultValue)
      console.log(this.formGroup.value.services )
      //JSON.parse(this.profile.services).push(event.srcElement.defaultValue ), 
    }else{

    }
    
  }
  
  changeStatus(event){ 
    this.all_island = event.target.checked; 
    (this.all_island)?  this.formGroup.controls['service_areas'].disable() :  this.formGroup.controls['service_areas'].enable() ;
   
  }

  setServiceAreaBy(event, index){
     
    if(index == 0){
      this.isCities = true;
      this.isDistricts = false;
      this.all_island = false;

    }else if(index == 1){
      this.isCities = false;
      this.isDistricts = true;
      this.all_island = false;

    }else if(index == 2){
      this.all_island = true;
      this.isCities = false;
      this.isDistricts = false;
    }
  }


 select2Order(){
   let e = this.eventE1;

  $("select").on("select2:select", function (evt) {
    e = evt;
    var element = e.params.data.element;
    var $element = $(element);
    
    $element.detach();
    $(this).append($element);
    $(this).trigger("change");
  });
 }

  onSave(){

    if (!this.formGroup.invalid) {

      (this.all_island)? this.formGroup.value.all_island = 1 : this.formGroup.value.all_island = 0 ; 
      

      console.log(this.formGroup.value);

      this.formGroup.value.client_id = this.clientId;
      this.formGroup.value.company_id = this.companyId; 
      this.formGroup.value.steps = 4; 
      this.formGroup.value.services = JSON.stringify(this.formGroup.value.services); 
      this.formGroup.value.products = JSON.stringify(this.formGroup.value.products); 

      if(this.isCities && !this.all_island){
        this.formGroup.value.service_areas = JSON.stringify(this.formGroup.value.service_areas); 
        this.formGroup.value.service_dist = "[]";

      }else if(this.isDistricts){
        this.formGroup.value.service_dist = JSON.stringify(this.formGroup.value.service_areas); 
        this.formGroup.value.service_areas = "[]";

      }else if(this.all_island){
        this.formGroup.value.service_dist = "[]";
        this.formGroup.value.service_areas = "[]";

      }
      
      console.log(this.formGroup.value)
      
      this.myaccount.updateProfileWithServiceArea(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            if( !this.isStepsForm ){
              this.toastr.success('Information saved successfully', 'Success !');  
              this.router.navigate(['/my-account/user/me/about']);
            }else{ 
              //this.router.navigate(["../contact-info"], { relativeTo: this.route.parent });
              this.router.navigate(['/my-account/user/me/about']);
            }
          
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 
          }
            
        }); 
       
    }

  }


  previousLink(){ 
    this.router.navigate(["../contact-info"], { relativeTo: this.route.parent });
  }

}
