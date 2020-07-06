import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProjectRoutingModule } from './view-project-routing.module';
import { ViewProjectComponent } from './view-project.component';


@NgModule({
  declarations: [ViewProjectComponent],
  imports: [
    CommonModule,
    ViewProjectRoutingModule
  ]
})
export class ViewProjectModule { }
