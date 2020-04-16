import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthDeactivateGuardService as AuthDeactiveGuard  } from '../../../admin/auth/frontend/auth-deactivate-guard.service';
import { PageContainerComponent } from './page-container.component';

const routes: Routes = [{ path: '', component: PageContainerComponent, children: [
    { path: '', loadChildren: () => import('../../../web/pages/home/home.module').then(m => m.HomeModule) },
    { path: 'contact', loadChildren: () => import('../../../web/pages/contact/contact.module').then(m => m.ContactModule) },
    { path: 'my-account', loadChildren: () => import('../../../web/pages/my-account/my-account.module').then(m => m.MyAccountModule) },
  ]},
  
	{ path: 'login', canActivate: [AuthDeactiveGuard], loadChildren: () => import('../../../web/pages/login/login.module').then(m => m.LoginModule) }, 
	
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule { }
