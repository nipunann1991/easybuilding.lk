import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    AppSharedModule
  ],
  exports: [ProjectsComponent]
})
export class ProjectsModule { }
