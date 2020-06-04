import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsRoutingModule } from './steps-routing.module';
import { StepsComponent } from './steps.component';
import { AppSharedModule } from '../../../../app.shared.module';

@NgModule({
  declarations: [StepsComponent],
  imports: [
    CommonModule,
    StepsRoutingModule,
    AppSharedModule,
  ]
})
export class StepsModule { }
