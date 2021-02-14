import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfimDialogBoxComponent } from './confim-dialog-box.component';

const routes: Routes = [{ path: '', component: ConfimDialogBoxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfimDialogBoxRoutingModule { }
