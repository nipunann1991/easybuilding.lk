import { Injectable } from '@angular/core'; 
import { LoginService } from '../../admin/api/login.service'; 
import { Subject } from 'rxjs/Subject';
import { Globals } from './../../app.global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  isAuthenticatedUser: Subject<boolean> = new Subject<boolean>();
  isUserValid: boolean; 
 
  
  constructor(
    private login: LoginService,
    private global: Globals
  ) {   
     
    this.isUserAuthenticated() 
  }
 
 

  public isAuthenticated():  any  {  

    const token: any = JSON.parse(localStorage.getItem('token'));

    if( localStorage.getItem("token") !== null){

      if(this.global.token.auth_token == "" || this.global.token.provider_id == "" ){
        this.global.token.auth_token = token.auth_token;
        this.global.token.provider_id = token.provider_id;
      }
      
      if (this.global.token.auth_token === token.auth_token && this.global.token.provider_id === token.provider_id ) {
		    return true;
      }

    }  
      return false;
  }

  isUserAuthenticated() :  boolean{ 
    const token: any = JSON.parse(localStorage.getItem('token'));

      return this.login.checkUserLoginStatus(token)
        .subscribe((response) => {
          console.log(response)
          if (response.status === 200 && response.data.length > 0) { 

            let token = { 
              auth_token:  response.data[0].auth_token, 
              session_id: response.data[0].client_id, 
              email: response.data[0].email, 
              provider_id: response.data[0].provider_id 
            };

            this.isAuthenticatedUser.next(true); 
            this.global.token.auth_token = token.auth_token;
            this.global.user.first_name = response.data[0].first_name;   
            this.global.user.profie_image = response.data[0].profie_image; 

            localStorage.setItem('token', JSON.stringify(token) ); 
             
            return this.isUserValid = true; 

          }else{
            this.isAuthenticatedUser.next(false);  
            return this.isUserValid = false;  
          }
           
      });  
        
    }

    validateBackendUser():  boolean{ 
      const token  = JSON.parse(localStorage.getItem('token'));

      if( localStorage.getItem("token") !== null){
        if(parseInt(token.provider_id.slice(0, 2)) / parseInt(token.session_id) === 2){
          return true
        } 
      }
     
      return false
    }

}


