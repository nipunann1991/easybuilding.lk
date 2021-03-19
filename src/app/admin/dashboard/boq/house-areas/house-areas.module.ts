import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseAreasRoutingModule } from './house-areas-routing.module';
import { HouseAreasComponent } from './house-areas.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [HouseAreasComponent],
  imports: [
    CommonModule,
    HouseAreasRoutingModule,
    AppSharedModule
  ]
})
export class HouseAreasModule { }
