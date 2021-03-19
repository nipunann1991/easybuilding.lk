import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseSurfaceTypesRoutingModule } from './house-surface-types-routing.module';
import { HouseSurfaceTypesComponent } from './house-surface-types.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [HouseSurfaceTypesComponent],
  imports: [
    CommonModule,
    HouseSurfaceTypesRoutingModule,
    AppSharedModule
  ]
})
export class HouseSurfaceTypesModule { }
