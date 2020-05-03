import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { AppSharedModule } from '../../../../app/app.shared.module'; 


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ClientsRoutingModule,
  ]
})
export class ClientsModule { }
