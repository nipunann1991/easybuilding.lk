import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesDialogBoxRoutingModule } from './services-dialog-box-routing.module';
import { ServicesDialogBoxComponent } from './services-dialog-box.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [ServicesDialogBoxComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ServicesDialogBoxRoutingModule
  ],
  
  exports: [ServicesDialogBoxComponent],
})
export class ServicesDialogBoxModule { }
