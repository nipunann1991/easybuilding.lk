import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { CitiesComponent } from './cities.component';
import { AppSharedModule } from '../../../../app/app.shared.module';


@NgModule({
  declarations: [CitiesComponent],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    AppSharedModule,
  ]
})
export class CitiesModule { }
