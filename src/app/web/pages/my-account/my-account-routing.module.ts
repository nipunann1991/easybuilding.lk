import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard  } from '../../../admin/auth/frontend/auth-guard.service';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  { path: '', component: MyAccountComponent, canActivate: [AuthGuard] , 
    children: [
      { path: 'settings', canActivate: [AuthGuard], loadChildren: () => import('../my-account/settings/settings.module').then(m => m.SettingsModule) }, 
	  	{ path: 'account-info', loadChildren: () => import('../my-account/account-info/account-info.module').then(m => m.AccountInfoModule) },
	
      
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
