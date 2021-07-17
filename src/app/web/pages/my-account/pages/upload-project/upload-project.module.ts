import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadProjectRoutingModule } from './upload-project-routing.module';
import { UploadProjectComponent } from './upload-project.component';
import { AppSharedModule } from '../../../../../app.shared.module';

@NgModule({
  declarations: [UploadProjectComponent],
  imports: [
    CommonModule,
    UploadProjectRoutingModule,
    AppSharedModule
  ]
})
export class UploadProjectModule { }
