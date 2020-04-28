import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { LoginService } from '../../../admin/api/login.service'; 
import { Globals } from './../../../app.global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  anim: string = '';
  status: boolean = false;
  isLoggedIn : boolean = false; 
  formIsValid: boolean = true;
  val : number = 0;

  formGroup: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authservice: Auth,
    private oauth: OAuth,
    private login: LoginService,
    private global: Globals

  ) {  }

  ngOnInit() { 
    this.isAuthorized();
       
  }

  
  onSubmit() { 

    //   if (!this.formGroup.invalid) { 
    //     this.formIsValid = true;
    //     localStorage.setItem('token', this.userDetails);
    //     console.log(this.userDetails);

    //     this.isAuthorized();
        

    //   }else{
    //     this.formIsValid = false;
    // } 

    
  }

  onClientLogin(userDetails): void {
    console.log(userDetails)
    let param = { 
      email: userDetails.email, 
      first_name: userDetails.firstName, 
      last_name: userDetails.lastName, 
      profie_image: userDetails.photoUrl, 
      provider: userDetails.provider.charAt(0),
      provider_id: userDetails.id, 
      auth_token:  userDetails.authToken 
    }
    
    this.login.onClientLogin(param)
      .subscribe((response: any) => {

        console.log(response);

        if (response.status == 200 && response.data.length > 0) { ;
 

           let token = { 
            auth_token:  userDetails.authToken, 
            session_id: response.data[0].client_id, 
            email: userDetails.email, 
            provider_id: response.data[0].provider_id 
          }; 
           
           this.global.token.auth_token = userDetails.authToken;
           this.global.token.provider_id = token.provider_id; 
           this.global.user.first_name = response.data[0].first_name; 
           this.global.user.profie_image = response.data[0].profie_image; 
           
           localStorage.setItem('token', JSON.stringify(token) ); 
           this.router.navigate(['my-account']);

        }else{

        }
        
          
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
      //console.log(user)
    });
  }

}
