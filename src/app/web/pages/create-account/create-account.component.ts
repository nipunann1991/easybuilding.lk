import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { LoginService } from '../../../admin/api/login.service'; 
import { Globals } from './../../../app.global';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['../login//login.component.scss']
})
export class CreateAccountComponent implements OnInit {


  anim: string = '';
  status: boolean = false;
  isLoggedIn : boolean = false; 
  formIsValid: boolean = true;
  val : number = 0;
  islogoOnly: boolean = true; 
  formGroup: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authservice: Auth,
    private oauth: OAuth,
    private login: LoginService,
    private global: Globals

  ) {  }

   

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
    });
  }

  onSubmit() { 

    if (!this.formGroup.invalid) { 
      this.formIsValid = true;
      this.formGroup.value.photoUrl = "";
      this.formGroup.value.provider = "E";
      this.formGroup.value.id = Date.now() + Math.floor(Math.random() * 1000);
      this.formGroup.value.authToken = this.makeToken() + Date.now();
  
      this.onClientLogin(this.formGroup.value);
      

      }else{
        this.formIsValid = false;
    } 
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
      password:  userDetails.password 
    }
    
    this.login.onClientLogin(param)
      .subscribe((response: any) => {

        console.log(response);

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
