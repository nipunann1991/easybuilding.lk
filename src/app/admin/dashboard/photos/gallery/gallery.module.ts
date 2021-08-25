import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { AppSharedModule } from 'src/app/app.shared.module';
import { ProjectsModule } from 'src/app/web/pages/my-account/pages/projects/projects.module';


@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    AppSharedModule,
    ProjectsModule
  ]
})
export class GalleryModule { }
