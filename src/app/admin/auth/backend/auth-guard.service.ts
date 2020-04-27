import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
  	public auth: AuthService,
  	public router: Router
  ) { 

	
  }

   	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		
		if (!this.auth.isAuthenticated()) { 
			this.router.navigate(['admin/login']);
			window.location.href
			return false;
			
		}else if(!this.auth.validateBackendUser()){
			this.router.navigate(['admin/login']);
			return false;

		}else if(this.auth.validateBackendUser() && this.auth.isAuthenticated()){
			if(state.url == '/admin'){
				this.router.navigate(['admin/dashboard']);
			}
			return true;
		}
	} 
  	
}
