import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute,  NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../services/my-account.service';
import { ProfileService } from "../profile/services/profile.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Globals } from "../../../../../app.global";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
 
  profile: any = {}
  isEmailDisabled: boolean = true;
  isStepsForm: boolean = false;
  isAdmin: boolean = false;
  isCompanyProfile: boolean = false;
  formGroup: FormGroup;
  personalFormGroup: FormGroup; 
  routerParams: any;

  public Editor = ClassicEditor;
  clientId: any; companyId: any; profileType: any;   profileTypeSelectedVal: number = -1;

  profileTypesList = [ 
    {title: "Business Profile", icon: "icon-business-profile", value: 1},
    {title: "Personal Profile", icon: "icon-single-profile", value: 0},
  ]

  professionalCategory: any = [
    {  id: 1, text: "Skilled Proffessional" },
    {  id: 2, text: "Professional Service provider" }, 
    {  id: 3, text: "Product Sale/Brand" }, 
  ]

  constructor(
    private myaccount: MyAccountService,
    private pf: ProfileService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public cdr: ChangeDetectorRef,
    public globals: Globals
  ) { }

  ngOnInit(): void {
     
    
    this.formGroup = new FormGroup({ 
      first_name: new FormControl({value:'', disabled: true}, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      last_name: new FormControl({value:'', disabled: true}, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      display_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      prof_category: new FormControl('', [
        Validators.required
      ]), 
      br_no: new FormControl(''),
      website: new FormControl(''), 
      description: new FormControl(''),
      email: new FormControl({value:'', disabled: true}, [ 
          Validators.required, 
      ]), 

    });


    this.personalFormGroup = new FormGroup({  
      display_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]), 
      description: new FormControl(''),
      email: new FormControl({value:'', disabled: true}, [ 
          Validators.required, 
      ]), 

    });

    if(this.router.url.includes("steps")){
      this.isStepsForm = true; 
    } 

    if(this.router.url.includes("admin")){
      this.isAdmin = true; 

      this.route.params.subscribe( (routeParams) =>  {  
        this.routerParams = routeParams;  
      });
    } 
     
    this.getAccountDetails(); 
  
  }

  getAccountDetails(){ 
    
    this.myaccount.getAccountDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
            
          this.profile = response.data[0];  

          this.profileTypeSelectedVal = this.profile.company_profile
          this.clientId = this.profile.client_id
          this.companyId = this.profile.company_id;
          this.profileType = this.profile.company_profile;  
          this.globals.setProfileTypeData(this.profileType);
          
          if(this.profileTypeSelectedVal == 0){

            this.personalFormGroup.setValue({ 
              display_name: this.profile.display_name, 
              description: this.profile.description,  
              email: this.profile.email,
            });

            this.personalFormGroup.get("display_name").disable();

          }else if(this.profileTypeSelectedVal == 1){

            this.formGroup.setValue({
                first_name: this.profile.first_name, 
                last_name: this.profile.last_name, 
                display_name: this.profile.display_name,
                prof_category: this.profile.prof_category,
                br_no: this.profile.br_no,
                description: this.profile.description,
                email: this.profile.email,
                website: this.profile.website
                
            });
 
          } 
          
           
        }else if (response.status == 401) {

          
        }
          
      });
  }


  saveBusinessProfile(){

    if (!this.formGroup.invalid) {

      this.formGroup.value.client_id = this.clientId;
      this.formGroup.value.company_id = this.companyId;
      this.formGroup.value.prof_category = parseInt(this.formGroup.value.prof_category); 
      this.formGroup.value.company_profile = this.profileType;
     
      this.myaccount.updateProfileDetails(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {

            if(this.isAdmin){
              
              if( !this.isStepsForm ){ 
                this.toastr.success('Information saved successfully', 'Success !');  
                this.router.navigate(['/admin/users/user/'+this.routerParams.user+"/"+this.routerParams.provider_id+"/about"]);
                
              }else{ 
                this.router.navigate(["../contact-info"], { relativeTo: this.route.parent });
              }
            
            }else{

              if( !this.isStepsForm ){
                this.toastr.success('Information saved successfully', 'Success !');  
                this.router.navigate(['/my-account']);
              }else{ 
                this.router.navigate(["../contact-info"], { relativeTo: this.route.parent });
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


  savePersonalProfile(){

    if (!this.personalFormGroup.invalid) {

      let presonalData = this.personalFormGroup.getRawValue();

      presonalData.client_id = this.clientId;
      presonalData.company_id = this.companyId;
      presonalData.company_profile = this.profileType; 
     
      this.myaccount.updateProfileDetails(presonalData)
        .subscribe((response: any) => {

          if (response.status == 200) { 
 
            if(this.isAdmin){ 
              this.toastr.success('Information saved successfully', 'Success !');  
              this.router.navigate(['/admin/users/user/'+this.routerParams.user+"/"+this.routerParams.provider_id+"/about"]);
            
            }else{

              if( !this.isStepsForm ){
                this.toastr.success('Information saved successfully', 'Success !');  
                this.router.navigate(['/my-account']);
              }else{ 
                this.router.navigate(["../contact-info"], { relativeTo: this.route.parent });
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

  selectedProfileType(e){
    this.profileTypeSelectedVal =  e.srcElement.defaultValue;  
  }

  backToProfile(){ 
   this.router.navigate([this.router.url.split('/edit/')[0] +'/about']);
  }

  continueSteps(){
    this.profileType = this.profileTypeSelectedVal 
    this.globals.setProfileTypeData(this.profileType) 

    if(this.profileTypeSelectedVal == 1){
      this.isCompanyProfile = true;

    }else{
      this.isCompanyProfile = false 
      this.personalFormGroup.setValue({ 
        display_name: this.profile.first_name+" "+this.profile.last_name, 
        description: this.profile.description,  
        email: this.profile.email,
      });
      this.personalFormGroup.get("display_name").disable();
    }
  }

}
