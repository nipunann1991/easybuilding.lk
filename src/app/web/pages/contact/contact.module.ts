import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { AppSharedModule } from '../../../app.shared.module';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ContactRoutingModule,
  ]
})
export class ContactModule { }
