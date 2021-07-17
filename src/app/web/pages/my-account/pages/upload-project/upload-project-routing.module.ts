import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadProjectComponent } from './upload-project.component';

const routes: Routes = [{ path: '', component: UploadProjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadProjectRoutingModule { }
