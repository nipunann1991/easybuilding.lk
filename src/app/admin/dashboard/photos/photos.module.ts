import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { imageModalDialog, PhotosComponent } from './photos.component';
import { AppSharedModule } from '../../../../app/app.shared.module';


@NgModule({
  declarations: [PhotosComponent, imageModalDialog],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    AppSharedModule
  ], 
  entryComponents: [imageModalDialog]
})
export class PhotosModule { }
