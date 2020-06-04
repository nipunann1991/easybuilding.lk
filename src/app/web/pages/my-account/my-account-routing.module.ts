import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuardService as AuthGuard  } from '../../../admin/auth/frontend/auth-guard.service';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  { path: 'user/:id/:provider_id', component: MyAccountComponent, canActivate: [AuthGuard] , 
    children: [ 
      { path: 'settings', canActivate: [AuthGuard], loadChildren: () => import('../my-account/settings/settings.module').then(m => m.SettingsModule) }, 
	  	{ path: 'account-info', loadChildren: () => import('../my-account/account-info/account-info.module').then(m => m.AccountInfoModule) },
	    { path: 'contact-info', loadChildren: () => import('../my-account/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
      { path: 'services', loadChildren: () => import('../my-account/services/services.module').then(m => m.ServicesModule) },
      { path: 'steps', loadChildren: () => import('../my-account/steps/steps.module').then(m => m.StepsModule) },
    ]
  },
  
  { path: '', redirectTo: 'user/me/0', canActivate: [AuthGuard], loadChildren: () => import('../my-account/user/user.module').then(m => m.UserModule) },
  
];

 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
