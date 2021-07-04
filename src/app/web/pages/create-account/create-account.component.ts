import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { LoginService } from '../../../admin/api/login.service'; 
import { Globals } from './../../../app.global';
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class CreateAccountComponent implements OnInit {


  anim: string = '';
  status: boolean = false;
  isLoggedIn : boolean = false; 
  isLoggedInForm : boolean = false; 
  formIsValid: boolean = true;
  isAdmin: boolean = false;
  val : number = 0;
  islogoOnly: boolean = true; 
  formGroup: FormGroup;
  formGroupAdmin : FormGroup;
  validateEmailAddress: boolean = false;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private authservice: Auth,
    private oauth: OAuth,
    private login: LoginService,
    private global: Globals,
    private toastr: ToastrService,

  ) {  

    this.router.events.subscribe((event) => {
       
      if (event instanceof NavigationEnd) {   

        if(this.router.url.includes("admin")){
          this.isAdmin = true;  
          localStorage.removeItem("token");
        }
 
          
      }

    }); 

  }

   

  ngOnInit(): void {
    this.isAuthorized();
 

    this.formGroup = this.formBuilder.group({ 

      firstName: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),

      lastName: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),

      email: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),

      password: new FormControl('', [ 
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(300)
      ]),

      retype_password: new FormControl(null, [ 
        Validators.required
      ]),
      
    }, {validators: this.MatchPassword('password', 'retype_password')});


    this.formGroupAdmin = this.formBuilder.group({ 

      firstName: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),

      lastName: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),

      email: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),

      password: new FormControl('', [ 
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(300)
      ]), 
      
    });
 
    if(this.isAdmin){
      this.setDataToForm();
    }
    
  }

  onSubmit() { 

    if (!this.formGroup.invalid) { 
       
      this.login.validateEmailAddressOnSignUp(this.formGroup.value)
        .subscribe((response: any) => {
          
          if (response.status == 200 && response.data.length > 0) {    
            this.toastr.error("An account is already registerd with the given email address.", 'Error !');  
             
          }else if (response.status == 200 && response.data.length == 0){  

            this.isLoggedInForm = true;
            this.formIsValid = true;
            this.formGroup.value.photoUrl = "";
            this.formGroup.value.provider = "E";
            this.formGroup.value.id = Date.now() + Math.floor(Math.random() * 1000);
            this.formGroup.value.authToken = this.makeToken() + Date.now(); 

            this.onClientLogin(this.formGroup.value);

          }else{
            
          } 


          this.isLoggedInForm = false;
            
      });
      
      }else{
        this.formIsValid = false;
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

  onSubmitAdmin() { 

    if (!this.formGroupAdmin.invalid) { 
      this.formIsValid = true;
      this.formGroupAdmin.value.photoUrl = "";
      this.formGroupAdmin.value.provider = "E";
      this.formGroupAdmin.value.id = Date.now() + Math.floor(Math.random() * 1000);
      this.formGroupAdmin.value.authToken = this.makeToken() + Date.now();
  
      this.onClientLoginAdmin(this.formGroupAdmin.value);
      

      }else{
        this.formIsValid = false;
    } 
  }

  setDataToForm(){
    this.formGroupAdmin.setValue({
        firstName: "Admin", 
        lastName: "User", 
        email: "info@easybuilding.lk", 
        password: this.makeToken(),  
    });
  }


  clearFilter(){
    this.formIsValid = true;
  }

  isAuthorized(){   
    if(this.authservice.isAuthenticated()){
      this.isLoggedIn = true;
    }   
  }


  onClientLogin(userDetails): void {
    
    let param = { 
      email: userDetails.email, 
      first_name: userDetails.firstName, 
      last_name: userDetails.lastName, 
      profie_image: userDetails.photoUrl, 
      provider: userDetails.provider.charAt(0),
      provider_id: userDetails.id, 
      auth_token:  userDetails.authToken, 
      password:  userDetails.password,
      is_admin: this.isAdmin 
    } 
    
    this.login.onClientLogin(param)
      .subscribe((response: any) => {
  
        if (response.status == 200 && response.data.length > 0) {  

          let token = { 
            auth_token:  userDetails.authToken, 
            session_id: response.data[0].client_id, 
            email: userDetails.email, 
            provider_id: response.data[0].provider_id 
          }; 
           
          localStorage.setItem('token', JSON.stringify(token) ); 
          window.location.href = environment.profileUrl; 

        }else{

        }
        
          
    });
  }



  onClientLoginAdmin(userDetails): void {
    
    let param = { 
      email: userDetails.email, 
      first_name: userDetails.firstName, 
      last_name: userDetails.lastName, 
      profie_image: userDetails.photoUrl, 
      provider: userDetails.provider.charAt(0),
      provider_id: userDetails.id, 
      auth_token:  userDetails.authToken, 
      password:  userDetails.password,
      is_admin: this.isAdmin 
    }
 
    
    this.login.onClientLoginAdmin(param)
      .subscribe((response: any) => {
  
        if (response.status == 200 && response.data.length > 0) {  

          let token = { 
            auth_token:  userDetails.authToken, 
            session_id: response.data[0].client_id, 
            email: userDetails.email, 
            provider_id: response.data[0].provider_id 
          }; 
           
          localStorage.setItem('tokenUser', JSON.stringify(token) ); 
          this.router.navigate(['/admin/users/create-profile/steps/account-info'], { relativeTo: this.route });
          

        }else{

        }
        
          
    });
  }

 


  makeToken() {
    var length = 15;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


  signInWithGoogle(): void {
    this.oauth.signIn(GoogleLoginProvider.PROVIDER_ID).then( (userDetails) =>{
      this.isLoggedIn = true; 
      this.onClientLogin(userDetails);
    }); 
     
  }
  
  signInWithFB(): void {
    this.oauth.signIn(FacebookLoginProvider.PROVIDER_ID).then( (userDetails) =>{
      this.isLoggedIn = true;
      this.onClientLogin(userDetails);
    });  
    
    
  } 
  
  signOut(): void {
    this.oauth.signOut().then( (userDetails) =>{
        this.isLoggedIn = false;
        localStorage.clear();  
    });    
  }


  oAuth(){
    this.oauth.authState.subscribe((user) => {
      if (user == null){
        this.isLoggedIn = false;
        console.log(user)
      }else{
        console.log(user)
        this.isLoggedIn = true;
      }
      
    });
  }


  

}
