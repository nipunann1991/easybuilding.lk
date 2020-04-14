import { Injectable } from '@angular/core';
import { Router, CanDeactivate  } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthDeactivateGuardService   {

  	constructor(
  		public authservice: AuthService,
  		public router: Router
  	) { }

 
  	canActivate(): any { 
		  
	    if (!this.authservice.isAuthenticated()) { 
			  return true;
			  
	    }else if(this.authservice.validateBackendUser() && this.authservice.isAuthenticated()){
			this.router.navigate(['admin/dashboard']);
			return false;
		}else{ 
			return true;
		}
		 
	}
}
