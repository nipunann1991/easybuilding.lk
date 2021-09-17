import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../../admin/api/login.service'; 
import { Globals } from './../../../app.global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-verification-dialog',
  templateUrl: './password-verification-dialog.component.html',
  styleUrls: ['./password-verification-dialog.component.css']
})
export class PasswordVerificationDialogComponent implements OnInit {
 
  formGroup: FormGroup;

  constructor( 
    public dialogRef: MatDialogRef<PasswordVerificationDialogComponent>,
    private formBuilder: FormBuilder,
    private login: LoginService,
    private global: Globals,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({ 
      username: new FormControl(JSON.parse(localStorage.getItem('tokenAdmin')).email),
      password: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),
    }); 

  }

  onSubmit(){
    if (!this.formGroup.invalid) {  
      this.onAdminLogin(this.formGroup.value) 
    }  
   
  }

  onDismiss(){
    this.dialogRef.close(false);
  }


  onAdminLogin(userDetails): void {
    
    let param = { 
      user_email: userDetails.username, 
      password: userDetails.password  
    }
    
    this.login.onAdminLogin(param)
      .subscribe({
        next: res =>{  

          if(res.data[0]?.role_id == 2){
            this.dialogRef.close(true);

          }else{
            this.toastr.error('You have entered a wrong password. Please try again', 'Error !'); 
            this.dialogRef.close(false);
          }
         
        },
        error: err =>{
          console.log(err)
        }
      })

  }

}
