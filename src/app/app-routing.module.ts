import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';  
 
import { AuthGuardService as AuthGuard  } from './admin/auth/frontend/auth-guard.service';
import { AuthDeactivateGuardService as AuthDeactiveGuard  } from './admin/auth/frontend/auth-deactivate-guard.service';


const routes: Routes = [
	
	{ path: '', loadChildren: () => import('./web/pages/home/home.module').then(m => m.HomeModule) },
	{ path: 'contact', loadChildren: () => import('./web/pages/contact/contact.module').then(m => m.ContactModule) },
	{ path: 'admin', loadChildren: () => import('./admin/dashboard/dashboard-container/dashboard-container.module').then(m => m.DashboardContainerModule) },
	{ path: '404-page-not-found', loadChildren: () => import('./web/pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
	
	{ path: 'login', canActivate: [AuthDeactiveGuard], loadChildren: () => import('./web/pages/login/login.module').then(m => m.LoginModule) }, 
	{ path: 'my-account', canActivate: [AuthGuard], loadChildren: () => import('./web/pages/my-account/my-account.module').then(m => m.MyAccountModule) },  
	
	{ path: '**', redirectTo: '/404-page-not-found' }
	 
	 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
