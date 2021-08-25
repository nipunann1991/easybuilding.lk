import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadedPhotosListRoutingModule } from './uploaded-photos-list-routing.module';
import { imageModalDialog, UploadedPhotosListComponent } from './uploaded-photos-list.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [
    UploadedPhotosListComponent,
    imageModalDialog
  ],
  imports: [
    CommonModule,
    UploadedPhotosListRoutingModule,
    AppSharedModule
  ],
  entryComponents: [UploadedPhotosListModule, imageModalDialog]
})
export class UploadedPhotosListModule { }
