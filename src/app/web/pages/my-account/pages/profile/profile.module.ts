import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent, SubscriptionDialog } from './profile.component';
import { AppSharedModule } from '../../../../../app.shared.module';


@NgModule({
  declarations: [ProfileComponent, SubscriptionDialog],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AppSharedModule,
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
