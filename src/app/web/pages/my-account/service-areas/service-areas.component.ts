import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute,  NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import {MatDialog} from '@angular/material/dialog';
import { HomepageService } from "../../../../admin/api/frontend/homepage.service";
import { ServicesDialogBoxComponent } from "./services-dialog-box/services-dialog-box.component";
import { Options } from 'select2'; 

@Component({
  selector: 'app-service-areas',
  templateUrl: './service-areas.component.html',
  styleUrls: ['./service-areas.component.scss']
})
export class ServiceAreasComponent implements OnInit {

  isStepsForm: boolean = false;
  isAdmin: boolean = false;
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
  getServicesItems: any;
  getProductsItems: any;
  selectedServicesItems: any;
  selectedProductsItems: any;
  

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private homePage: HomepageService
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({  

      services: new FormControl(""),
       
      products: new FormControl(""), 

      service_areas: new FormControl("", [
        Validators.required
      ]), 

       
    });

    this.options = {
      multiple: true, 
      closeOnSelect: true, 
      tags: true 
    };

    if(this.router.url.includes("steps")){
      this.isStepsForm = true; 
    }

    if(this.router.url.includes("admin")){
      this.isAdmin = true; 
    }

    this.getCities();  
    this.getDistricts();
    this.getServicesMenuItems();
    this.getProductsMenuItems();
    this.getServiceCategories();
    this.getProductCategories();
    this.select2Order();
    this.getServiceDetails();
  
  }


  openDialog() {
    
  }

  getServiceDetails(){

    this.myaccount.getServiceDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.profile = response.data[0];
  
          if(this.profile.service_areas != "[]" && this.profile.service_dist != "[]"){
            this.isCities = true;

          }else{ 

            (this.profile.service_areas != "[]")? this.isCities = true :  this.isCities = false ;
            (this.profile.service_dist != "[]")? this.isDistricts = true :  this.isDistricts = false ;
            
            if((this.profile.all_island == 1 && !this.isStepsForm) || (this.profile.all_island == 1 && this.isAdmin)){
              this.all_island = true;
              this.formGroup.controls['service_areas'].disable();
            }else{
              this.all_island = false;
            }  
          }
           
          let products = "[]";
          this.clientId = this.profile.client_id;
          this.companyId = this.profile.company_id; 

          console.log(this.profile.services);

          this.selectedServicesItems = JSON.parse(this.profile.services);
          this.selectedProductsItems = JSON.parse(this.profile.products);

          if(this.profile.products != ''){
            products = this.profile.products
          }
 

          if(this.isDistricts){

            this.formGroup.setValue({
              service_areas: JSON.parse(this.profile.service_dist),  
              services: JSON.parse(this.profile.services),
              products: JSON.parse(products)
            });

          }
          
          if(this.isCities){

            this.formGroup.setValue({
              service_areas: JSON.parse(this.profile.service_areas),  
              services: JSON.parse(this.profile.services),
              products: JSON.parse(products)

            }); 

          }


          if(this.all_island){

            this.formGroup.setValue({
              service_areas: JSON.parse(this.profile.service_areas),  
              services: JSON.parse(this.profile.services),
              products: JSON.parse(products)
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
    (event.srcElement.checked)? this.formGroup.value.services.push(event.srcElement.defaultValue) : "";
    this.selectedServicesItems = this.formGroup.value.services;
  }
  
  changeStatus(event){ 
    this.all_island = event.target.checked; 
    
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

    (this.all_island)?  this.formGroup.controls['service_areas'].disable() :  this.formGroup.controls['service_areas'].enable() ;
   
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
       

      this.formGroup.value.client_id = this.clientId;
      this.formGroup.value.company_id = this.companyId; 
      this.formGroup.value.steps = 4; 
      this.formGroup.value.services = JSON.stringify(this.formGroup.value.services); 
      this.formGroup.value.products = JSON.stringify(this.formGroup.value.products); 

      if(this.isCities && !this.all_island){
        this.formGroup.value.service_areas = JSON.stringify(this.formGroup.value.service_areas); 
        this.formGroup.value.service_dist = "[]";

      }else if(this.isDistricts){
        this.formGroup.value.service_dist = JSON.stringify(this.formGroup.value.service_areas)
        this.formGroup.value.service_areas = "[]";

      }else if(this.all_island){
        this.formGroup.value.service_dist = "[]";
        this.formGroup.value.service_areas = "[]";

      }
       
      this.myaccount.updateProfileWithServiceArea(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {

            if(this.isAdmin){
              this.toastr.success('Profile created successfully', 'Success !');  
              this.router.navigate(['/admin/users']);
            }else{

              if( !this.isStepsForm ){
                this.toastr.success('Information saved successfully', 'Success !');  
                this.router.navigate(['/my-account/user/me/about']);
              }else{  
                this.router.navigate(['/my-account/user/me/about']);
              }

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


  openServiceAreaModal(){ 

    const dialogRef = this.dialog.open(ServicesDialogBoxComponent, {
      width: '1000px',
      data: {view_id: 1, data: this.getServicesItems, selected: this.selectedServicesItems  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != false){
        this.formGroup.value.services = result; 
        this.formGroup.get('services').setValue(result);
      }
      
    });
  }


  openProductsAreaModal(){ 

    const dialogRef = this.dialog.open(ServicesDialogBoxComponent, {
      width: '1000px',
      data: {view_id: 2, data: this.getProductsItems, selected: this.selectedProductsItems  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != false){
        this.formGroup.value.products = result; 
        this.formGroup.get('products').setValue(result);
        console.log(this.formGroup.get('products'))
      }
      
    });
  }

  getProductsMenuItems(){
    this.homePage.getProductsMenuItems() 
    .subscribe((response: any) => { 
      this.getProductsItems = response; 
    }); 
  }

  getServicesMenuItems(){
    this.homePage.getServicesMenuItems() 
    .subscribe((response: any) => { 
      this.getServicesItems = response; 
    }); 
  }

}
