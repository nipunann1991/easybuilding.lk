import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard  } from '../../../admin/auth/frontend/auth-guard.service';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  { path: '', component: MyAccountComponent, canActivate: [AuthGuard]  },
  { path: 'settings', canActivate: [AuthGuard], loadChildren: () => import('../my-account/settings/settings.module').then(m => m.SettingsModule) }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
