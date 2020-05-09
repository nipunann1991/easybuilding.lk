import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { AppSharedModule } from '../../../../../app/app.shared.module';


@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule, 
    GeneralRoutingModule,
    AppSharedModule,
  ],
  exports: [GeneralComponent],
})
export class GeneralModule { }
