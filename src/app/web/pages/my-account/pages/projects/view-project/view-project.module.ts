import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ViewProjectRoutingModule } from './view-project-routing.module';
import { ViewProjectComponent } from './view-project.component';
import { AppSharedModule } from '../../../../../../app.shared.module';


@NgModule({
  declarations: [ViewProjectComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ViewProjectRoutingModule
  ],
  exports: [ViewProjectComponent]
})
export class ViewProjectModule { }
