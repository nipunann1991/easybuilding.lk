import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component'; 
import { AuthDeactivateGuardService as AuthDeactiveGuard  } from '../../../admin/auth/auth-deactivate-guard.service';

const routes: Routes = [{ path: '', component: LoginComponent, canActivate: [AuthDeactiveGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
