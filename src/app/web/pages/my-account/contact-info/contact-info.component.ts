import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  formGroup: FormGroup;
  clientId: any;
  profile: any = {}
  isStepsForm: boolean = false;


  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
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

      tel1: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),

      tel2: new FormControl('', [ 
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
       
      email: new FormControl({value:'', disabled: true}, [ 
          Validators.required, 
      ]), 

    });

    if(this.router.url.includes("steps")){
      this.isStepsForm = true;
    }
  }


  getAccountDetails(){

    this.myaccount.getContactDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.profile = response.data[0];


          this.formGroup.setValue({
            address_line1: this.profile.address_line1, 
            address_line2: this.profile.address_line2,
            city: this.profile.city,
            tel1: this.profile.tel1,
            tel2: this.profile.tel2,
            email: this.profile.email,
          });

          this.clientId = this.profile.client_id
  
        }else{
            
        }
          
      });
  }

  onSave(){

    if (!this.formGroup.invalid) {

      this.formGroup.value.client_id = this.clientId; 
      this.myaccount.updateProfileDetails(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('Information saved successfully', 'Success !');  
            this.router.navigate(['/my-account/user/me/0/']);
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 
          }
            
        });
    }

  }

  previousLink(){
    this.router.navigate(['/my-account/user/me/0/steps/account-info']);
  }

}
