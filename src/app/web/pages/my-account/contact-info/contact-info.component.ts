import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  formGroup: FormGroup;
  clientId: any; companyId: any;
  profile: any = {}
  nearestCity: any = [];
  isStepsForm: boolean = false; 
  isAdmin: boolean = false; 
  profileType: string = "";

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getCities();
    this.getAccountDetails();
    
    
    this.formGroup = new FormGroup({ 
      address_line1: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      address_line2: new FormControl(''),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      city_id: new FormControl("", [
        Validators.required
      ]), 

      tel1: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),

      tel2: new FormControl('', [ 
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
       
      email: new FormControl({value:'', disabled: false}, [ 
          Validators.required, 
      ]), 

    });

    if(this.router.url.includes("steps")){
      this.isStepsForm = true;
    }


    if(this.router.url.includes("admin")){
      this.isAdmin = true;
      this.formGroup.get("address_line1").setValidators(null);
      this.formGroup.get("email").setValidators(null);
    }
 
  }


  getAccountDetails(){

    this.myaccount.getContactDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          let email = "";

          this.profile = response.data[0];

          if(this.profile.company_profile == 1){
            this.profileType = "Company"; 
            email = this.profile.email;

          }else{
            this.profileType = "" ; 
            this.formGroup.get("email").disable();
            email = this.profile.signup_email;
             
          }     
         
          this.formGroup.setValue({
            address_line1: this.profile.address_line1, 
            address_line2: this.profile.address_line2,
            city: this.profile.city,
            city_id: this.profile.city_id,
            tel1: this.profile.tel1,
            tel2: this.profile.tel2,
            email: email,
          });

          this.clientId = this.profile.client_id;
          this.companyId = this.profile.company_id;
  
        }else{
            
        }
          
      });
  }


  getCities(){ 

    this.myaccount.getCities() 
      .subscribe((response: any) => {
        if (response.status == 200) { 
          this.nearestCity = response.data; 
          
        }else{
            
        }
          
      });
  }

  onSave(){

    if (!this.formGroup.invalid) {

      let presonalData = this.formGroup.getRawValue();

      presonalData.client_id = this.clientId;
      presonalData.company_id = this.companyId;  
      
      if(this.profile.company_profile == 0){
        presonalData.steps = 2; 
      } 

      this.myaccount.updateProfileDetails(presonalData)
        .subscribe((response: any) => {

          if (response.status == 200) {

            if( !this.isStepsForm || this.profile.company_profile == 0 ){
              this.toastr.success('Information saved successfully', 'Success !');  
              this.router.navigate(['/my-account/user/me/about']);
            }else{ 
              this.router.navigate(["../service-areas"], { relativeTo: this.route.parent });
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
    this.router.navigate(["../account-info"], { relativeTo: this.route.parent });
  }

}
