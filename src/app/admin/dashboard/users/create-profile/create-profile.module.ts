import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProfileRoutingModule } from './create-profile-routing.module';
import { CreateProfileComponent } from './create-profile.component';
import { AppSharedModule } from '../../../../app.shared.module'; 

@NgModule({
  declarations: [CreateProfileComponent],
  imports: [
    CommonModule,
    CreateProfileRoutingModule,
    AppSharedModule
  ]
})
export class CreateProfileModule { }
