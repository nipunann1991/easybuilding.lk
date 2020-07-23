import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { ProfileModule } from './profile/profile.module';
import { AppSharedModule } from '../../../app.shared.module';
import { UserModule } from './user/user.module';

 
@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    AppSharedModule,
    ProfileModule, 
  ],
  exports: [MyAccountComponent]
})

export class MyAccountModule { }
