import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MyAccountModule } from '../../../../web/pages/my-account/my-account.module';
import { AppSharedModule } from '../../../../../app/app.shared.module'; 


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule, 
    AppSharedModule,
    MyAccountModule
  ]
})
export class UserModule { }
