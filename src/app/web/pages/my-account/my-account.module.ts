import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    ProfileModule,
  ],
  exports: [MyAccountComponent]
})
export class MyAccountModule { }
