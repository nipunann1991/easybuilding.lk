import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { AppSharedModule } from '../../../../app/app.shared.module';
import { UploadedPhotosListModule } from './uploaded-photos-list/uploaded-photos-list.module';


@NgModule({
  declarations: [PhotosComponent],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    AppSharedModule,
    UploadedPhotosListModule
  ], 
})
export class PhotosModule { }
