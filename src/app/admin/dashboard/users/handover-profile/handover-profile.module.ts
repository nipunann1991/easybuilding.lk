import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandoverProfileRoutingModule } from './handover-profile-routing.module';
import { HandoverProfileComponent } from './handover-profile.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [
    HandoverProfileComponent
  ],
  imports: [
    CommonModule,
    HandoverProfileRoutingModule,
    AppSharedModule
  ],
  exports: [HandoverProfileComponent]
})
export class HandoverProfileModule { }
