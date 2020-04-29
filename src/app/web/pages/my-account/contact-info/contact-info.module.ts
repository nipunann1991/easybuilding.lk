import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactInfoRoutingModule } from './contact-info-routing.module';
import { ContactInfoComponent } from './contact-info.component';
import { AppSharedModule } from '../../../../app.shared.module';


@NgModule({
  declarations: [ContactInfoComponent],
  imports: [
    CommonModule,
    ContactInfoRoutingModule,
    AppSharedModule, 
  ]
})
export class ContactInfoModule { }
