import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientProfilesComponent } from './client-profiles.component';

const routes: Routes = [{ path: '', component: ClientProfilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfilesRoutingModule { }
