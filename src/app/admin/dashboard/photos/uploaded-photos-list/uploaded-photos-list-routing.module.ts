import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadedPhotosListComponent } from './uploaded-photos-list.component';

const routes: Routes = [{ path: '', component: UploadedPhotosListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadedPhotosListRoutingModule { }
