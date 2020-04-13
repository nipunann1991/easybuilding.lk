import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ClientsService } from '../../../admin/api/clients.service'; 
import { Globals } from './../../../app.global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  anim: string = '';
  status: boolean = false;
  isLoggedIn : boolean = false;
  // loginFaild: boolean = false;
  formIsValid: boolean = true;
  val : number = 0;

  formGroup: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authservice: Auth,
    private oauth: OAuth,
    private client: ClientsService,
    private global: Globals

  ) {  }

  ngOnInit() {
    this.val = 0;
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

    let param = { 
      email: userDetails.email, 
      first_name: userDetails.firstName, 
      last_name: userDetails.lastName, 
      provider: userDetails.provider.charAt(0),
      provider_id: userDetails.id, 
      auth_token:  userDetails.authToken 
    }
    
    this.client.onClientLogin(param)
      .subscribe((response: any) => {

        if (response.status == 200) { ;

           let token = { auth_token:  userDetails.authToken, session_id: response.data.client_id, email: userDetails.email }; 
           this.global.auth_token = userDetails.authToken;
           localStorage.setItem('token', JSON.stringify(token) );

            console.log(response);
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
        console.log(userDetails);
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
