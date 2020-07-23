import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AppSharedModule } from '../../../../app.shared.module';
import { MyAccountModule } from '../my-account.module'; 
import { SettingsModule } from '../settings/settings.module';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule, 
    UserRoutingModule,
    AppSharedModule,
    SettingsModule
  ],
  
})
export class UserModule { }
