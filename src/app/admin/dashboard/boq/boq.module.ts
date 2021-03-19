import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoqRoutingModule } from './boq-routing.module';
import { BoqComponent } from './boq.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [BoqComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    BoqRoutingModule
  ]
})
export class BoqModule { }
