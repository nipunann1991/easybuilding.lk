import { Injectable } from '@angular/core';
import { Router, CanDeactivate  } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthDeactivateGuardService   {

  	constructor(
  		public auth: AuthService,
  		public router: Router
  	) { }

 
  	canActivate(): boolean {

	    if (!this.auth.isAuthenticated()) { 
	      	return true;
	    }else{  
			this.router.navigate(['admin/dashboard']);
	    	return false;
		}
		 
	}
}
