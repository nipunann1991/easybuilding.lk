import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProfilesRoutingModule } from './client-profiles-routing.module';
import { ClientProfilesComponent } from './client-profiles.component';
import { AppSharedModule } from '../../../app.shared.module'; 

@NgModule({
  declarations: [ClientProfilesComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ClientProfilesRoutingModule
  ]
})
export class ClientProfilesModule { }
