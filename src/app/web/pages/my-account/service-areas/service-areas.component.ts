import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute,  NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { Options } from 'select2';

@Component({
  selector: 'app-service-areas',
  templateUrl: './service-areas.component.html',
  styleUrls: ['./service-areas.component.css']
})
export class ServiceAreasComponent implements OnInit {

  isStepsForm: boolean = false;
  all_island: boolean = false;
  profile: any = {};
  clientId: any; companyId: any;
  eventE1: any;
  public value: string[];
  
  formGroup: FormGroup;
  public options: Options;

  serviceAreas: any = [
     
  ];

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({ 
      
      service_areas: new FormControl({value:''}, [
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

   
    this.getServiceDetails();
    this.getCities();  
    this.select2Order();
  }


  getServiceDetails(){

    this.myaccount.getServiceDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.profile = response.data[0];
          
          if(this.profile.service_areas != ""){
           
            this.formGroup.setValue({
              service_areas: JSON.parse(this.profile.service_areas),  
            }); 

             console.log(JSON.parse(this.profile.service_areas))
            
          }else{
            this.formGroup.setValue({
              service_areas: [],  
            }); 
          }
         
          
          if(this.profile.all_island == 1){
            this.all_island = true;
            this.formGroup.controls['service_areas'].disable();

          }else{
            this.all_island = false;
            this.formGroup.controls['service_areas'].enable(); 

          }  
      

          this.clientId = this.profile.client_id
          this.companyId = this.profile.company_id
  
        }else{
            
        }
          
      });
  }

  getCities(){ 

    this.myaccount.getCities() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.serviceAreas = response.data; 
          // this.formGroup.setValue({
          //   service_areas: ["1071","1048","1042"] //JSON.parse(this.profile.service_areas),  
          // }); 
  
        }else{
            
        }
          
      });
  }

  changeStatus(event){ 
    this.all_island = event.target.checked; 
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

      console.log(this.formGroup.value);

      this.formGroup.value.client_id = this.clientId;
      this.formGroup.value.company_id = this.companyId; 
      this.formGroup.value.steps = 4; 
      this.formGroup.value.service_areas = JSON.stringify(this.formGroup.value.service_areas); 
      
      this.myaccount.updateProfileWithServiceArea(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            if( !this.isStepsForm ){
              this.toastr.success('Information saved successfully', 'Success !');  
              this.router.navigate(['/my-account/user/me/0/about']);
            }else{ 
              //this.router.navigate(["../contact-info"], { relativeTo: this.route.parent });
              this.router.navigate(['/my-account/user/me/0/about']);
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
