import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseSurfacesRoutingModule } from './house-surfaces-routing.module';
import { HouseSurfacesComponent } from './house-surfaces.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [HouseSurfacesComponent],
  imports: [
    CommonModule,
    HouseSurfacesRoutingModule,
    AppSharedModule
  ]
})
export class HouseSurfacesModule { }
