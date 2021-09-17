import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandoverProfileComponent } from './handover-profile.component';

const routes: Routes = [{ path: '', component: HandoverProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandoverProfileRoutingModule { }
