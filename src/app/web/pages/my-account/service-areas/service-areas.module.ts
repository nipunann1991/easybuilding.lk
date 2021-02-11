import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceAreasRoutingModule } from './service-areas-routing.module';
import { ServiceAreasComponent } from './service-areas.component';
import { AppSharedModule } from '../../../../app.shared.module'; 
import { ServicesDialogBoxModule } from './services-dialog-box/services-dialog-box.module';


@NgModule({
  declarations: [ServiceAreasComponent],
  imports: [
    CommonModule,
    ServiceAreasRoutingModule,
    AppSharedModule,  
    ServicesDialogBoxModule,
  ]
})
export class ServiceAreasModule { }
