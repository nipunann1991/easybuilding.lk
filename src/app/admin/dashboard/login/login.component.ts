import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService as Auth } from '../../auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";


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

  formGroup: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authservice: Auth,
    private oauth: OAuth

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
        localStorage.setItem('token', this.userDetails);
        console.log(this.userDetails);

        this.isAuthorized();
        

      }else{
        this.formIsValid = false;
    } 
  }

  clearFilter(){
    this.formIsValid = true;
  }

  isAuthorized(){
    if (this.authservice.isAuthenticated()) {
        this.router.navigate(['admin/dashboard']);
      }
  }


  signInWithGoogle(): void {
    this.oauth.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.oAuth();
    }
  
  signInWithFB(): void {
    this.oauth.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.oAuth();
    
    
  } 
  
  signOut(): void {
    this.oauth.signOut();
  }


  oAuth(){
    this.oauth.authState.subscribe((user) => {
      console.log(user)
    });
  }

}
