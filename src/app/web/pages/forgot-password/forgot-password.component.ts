import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../../admin/api/login.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup: FormGroup;
  isResetLinkSent: boolean = false;
  islogoOnly: boolean = true;
  isSubmitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private login: LoginService,
    private toastr: ToastrService,
  ) { } 

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({ 

        email: new FormControl('', [ 
          Validators.required,
          Validators.maxLength(300)
        ]),
 
    });  

  }

  onSubmit() { 
    if (!this.formGroup.invalid) { 
      this.isSubmitted = true;
        this.login.checkEmail(this.formGroup.value)
          .subscribe((response: any) => {
            this.isSubmitted = false;
            if (response.status == 200 && response.data.length > 0) {   
              console.log(response); 
              this.isResetLinkSent = true;

            }else{
 
              this.toastr.error("No account is registerd with the given email address. Please check and try again", 'Error !');  

            }
            
              
        });
    }
  }

}
