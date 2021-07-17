import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesDialogBoxComponent } from './services-dialog-box.component';

const routes: Routes = [{ path: '', component: ServicesDialogBoxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesDialogBoxRoutingModule { }
