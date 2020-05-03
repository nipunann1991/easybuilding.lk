import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  profile: any = {}
  isEmailDisabled: boolean = true;
  formGroup: FormGroup;
  public Editor = ClassicEditor;
  clientId: any;

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,
    private router: Router,
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
      display_name: new FormControl(''),
      description: new FormControl(''),
      email: new FormControl({value:'', disabled: true}, [ 
          Validators.required, 
      ]), 

    });
 

    this.getAccountDetails()
  }

  getAccountDetails(){

    this.myaccount.getAccountDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.profile = response.data[0];


          this.formGroup.setValue({
              first_name: this.profile.first_name, 
              last_name: this.profile.last_name,
              display_name: this.profile.display_name,
              description: this.profile.description,
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
            this.router.navigate(['/my-account/user/me/0']);
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 
          }
            
        });
    }

  }

}
