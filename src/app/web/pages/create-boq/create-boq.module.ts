import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBoqRoutingModule } from './create-boq-routing.module';
import { CreateBoqComponent } from './create-boq.component';
import { AppSharedModule } from '../../../app.shared.module';

@NgModule({
  declarations: [CreateBoqComponent],
  imports: [
    CommonModule,
    CreateBoqRoutingModule,
    AppSharedModule
  ]
})
export class CreateBoqModule { }
