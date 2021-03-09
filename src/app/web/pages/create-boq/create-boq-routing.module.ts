import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBoqComponent } from './create-boq.component';

const routes: Routes = [{ path: '', component: CreateBoqComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBoqRoutingModule { }
