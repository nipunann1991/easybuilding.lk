import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosComponent } from './photos.component';

const routes: Routes = [{ path: '', component: PhotosComponent, children: [
  { path: '', loadChildren: () => import('./uploaded-photos-list/uploaded-photos-list.module').then(m => m.UploadedPhotosListModule) },
  { path: 'gallery/:user/:provider_id', loadChildren: () => import('./gallery/gallery.module').then(m => m.GalleryModule) },
	
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
