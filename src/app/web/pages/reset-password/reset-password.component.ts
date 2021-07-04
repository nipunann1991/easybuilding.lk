import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { LoginService } from '../../../admin/api/login.service'; 
import { RouterModule, Routes, Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formGroup: FormGroup;
  isResetLinkSent: boolean = false;
  islogoOnly: boolean = true;
  isPwdMatch: boolean = false;
  queryParams: any;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private login: LoginService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { } 

  ngOnInit(): void {
    this.queryParams = this.activatedRoute.snapshot.queryParams
    this.formGroup = this.formBuilder.group({ 

        request_reset: new FormControl({value: '', disabled: false}, [ 
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10), 
          Validators.min(1)
        ]),

        password: new FormControl(null, [ 
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(300)
        ]),

        retype_password: new FormControl(null, [ 
          Validators.required
        ]),

    },{validators: this.MatchPassword('password', 'retype_password')}); 
     
    this.formGroup.controls.request_reset.setValue(this.queryParams.verifycode);
  }

  onSubmit() { 
 
    if (!this.formGroup.invalid) { 

      this.formGroup.value.client_id = this.queryParams.client_id
      this.formGroup.value.email = this.queryParams.email

      this.isSubmitted = false;
      this.login.resetPassword(this.formGroup.value)
          .subscribe((response: any) => {
              
            if (response.status == 200 && response.data.length > 0) {   
              console.log(response); 
              this.isResetLinkSent = true;
              this.toastr.success("New passwords has been updated successfully.", 'Success !');  

              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1000);
            }else{
 
              this.toastr.error("No account is registerd with the given email address. Please check and try again", 'Error !');  

            }
            
              
        });
    }
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
  
    if (c.get('password').value !== c.get('retype_password').value) {
        
        return {invalid: true};
    }
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  

}
