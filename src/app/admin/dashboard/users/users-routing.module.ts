import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  // { path: 'user', loadChildren: () => import('../../../web/pages/public-profile/public-profile.module').then(m => m.PublicProfileModule) },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
