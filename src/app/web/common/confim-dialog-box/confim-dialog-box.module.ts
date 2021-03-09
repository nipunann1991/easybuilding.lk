import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfimDialogBoxRoutingModule } from './confim-dialog-box-routing.module';
import { ConfimDialogBoxComponent } from './confim-dialog-box.component';
import { AppSharedModule } from 'src/app/app.shared.module'; 


@NgModule({
  imports: [
    CommonModule,  
    ConfimDialogBoxRoutingModule,
    AppSharedModule,
  ],
  
 
})
export class ConfimDialogBoxModule { }
