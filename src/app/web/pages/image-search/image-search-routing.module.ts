import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageSearchComponent } from './image-search.component';

const routes: Routes = [{ path: '', component: ImageSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageSearchRoutingModule { }
