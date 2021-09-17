import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService as Auth } from '../../auth/auth.service';
import { LoginService } from '../../../admin/api/login.service'; 
import { Globals } from './../../../app.global';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userDetails : any = {
    username : '',
    password: ''
  }

  anim: string = '';
  status: boolean = false;
  loginFaild: boolean = false;
  formIsValid: boolean = true;
  isLoggedIn : boolean = false;
  isUserValid: boolean = false; 
  noUserAvailable: boolean = false; 

  formGroup: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authservice: Auth,
    private login: LoginService,
    private global: Globals 

  ) { }

  ngOnInit() {

      this.formGroup = this.formBuilder.group({ 

          username: new FormControl('', [ 
            Validators.required,
            Validators.maxLength(300)
          ]),

          password: new FormControl('', [ 
            Validators.required,
            Validators.maxLength(300)
          ]),
      }); 
      

      this.isAuthorized();

  }
 
  onSubmit() { 

      if (!this.formGroup.invalid) { 
        this.formIsValid = true;
        this.onAdminLogin(this.formGroup.value)
        

      }else{
        this.formIsValid = false;
    } 
  }

  clearFilter(){
    this.formIsValid = true;
  }

  isAuthorized(){
    this.authservice.isAuthenticatedUser.subscribe(value => { 
      this.isUserValid = value; 

      if(this.isUserValid){
        this.isLoggedIn = true;
      } 
       
    });
  }


  onAdminLogin(userDetails): void {
    
    let param = { 
      user_email: userDetails.username, 
      password: userDetails.password  
    }
    
    this.login.onAdminLogin(param)
      .subscribe((response: any) => {

        console.log(response);

        if (response.status == 200 && response.data.length > 0) { 

          let data = response.data[0];
          let provider_id = '';

          (data.role_id==2)? provider_id = this.global.isAdminToken :  provider_id = this.global.isManagerToken;

           let token = { 
            auth_token:  data.auth_token, 
            session_id: data.user_id, 
            email: data.user_email, 
            provider_id: provider_id,  
          }; 
           
           this.global.tokenAdmin.auth_token = data.auth_token;
           this.global.tokenAdmin.provider_id = ""; 
           this.global.userAdmin.first_name = data.user_email; 
           this.global.userAdmin.profie_image = ""; 

           
          localStorage.setItem('tokenAdmin', JSON.stringify(token) );  
          this.isLoggedIn = true; 
          window.location.reload();

        }else{
          this.noUserAvailable = true;

          setTimeout(()=>{
            this.noUserAvailable = false;

          },3000)
        }
        
          
    })

  }


}
