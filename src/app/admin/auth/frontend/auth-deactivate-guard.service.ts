import { Injectable } from '@angular/core';
import { Router, CanDeactivate  } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { environment } from "../../../../environments/environment";

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
      this.router.navigate([environment.profileUrl]); 
      return false;

    }
    
  }
}
