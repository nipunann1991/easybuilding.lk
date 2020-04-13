import { Injectable } from '@angular/core'; 
import { ClientsService } from '../../admin/api/clients.service'; 
import { Subject } from 'rxjs/Subject';
import { Globals } from './../../app.global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  isAuthenticatedUser: Subject<boolean> = new Subject<boolean>();
  isUserValid: boolean; 
 
  
  constructor(
    private client: ClientsService,
    private global: Globals
  ) {   
    this.isUserAuthenticated()
  }
 
 

  public isAuthenticated():  any  {  

    const token: any = JSON.parse(localStorage.getItem('token'));

    if( localStorage.getItem("token") !== null){

      if(this.global.auth_token == ""){
        this.global.auth_token = token.auth_token
      }
      
      if (this.global.auth_token === token.auth_token) {
		    return true;
      }

    }
     
      
      return false;
  }

  isUserAuthenticated() :  boolean{ 
    const token: any = JSON.parse(localStorage.getItem('token'));
      return this.client.checkUserLoginStatus(token)
        .subscribe((response) => {
          //console.log(response);
          if (response.status == 200 && response.data.length == 0) {  
            this.isAuthenticatedUser.next(false); 
            return this.isUserValid = false;  

          }else if (response.status == 200 && response.data.length > 0) { 
            this.isAuthenticatedUser.next(true);  
            this.global.auth_token = token.auth_token; 

            return this.isUserValid = true;
          }
           
      }); 
       
       //this.isAuthenticatedUser.next(this.isUserValid);
  }

}


