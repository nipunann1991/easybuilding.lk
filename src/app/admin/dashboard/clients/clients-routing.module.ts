import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  // { path: 'user', loadChildren: () => import('../../../web/pages/public-profile/public-profile.module').then(m => m.PublicProfileModule) },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
