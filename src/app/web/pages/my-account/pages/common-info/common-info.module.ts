import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonInfoRoutingModule } from './common-info-routing.module';
import { CommonInfoComponent } from './common-info.component';


@NgModule({
  declarations: [
    CommonInfoComponent
  ],
  imports: [
    CommonModule,
    CommonInfoRoutingModule
  ],
  exports: [CommonInfoComponent]
})
export class CommonInfoModule { }
