import { Injectable } from '@angular/core';
import { Router, CanDeactivate  } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthDeactivateGuardService {

  constructor(
    public authservice: AuthService,
  	public router: Router
  ) { }


  canActivate(): any { 
		  
    if (!this.authservice.isAuthenticated()) { 
      return true;
      
    }else {
      this.router.navigate(['my-account']); 
      return false;

    }
    
  }
}
