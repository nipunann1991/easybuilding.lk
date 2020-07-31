import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MyAccountModule } from '../../../../web/pages/my-account/my-account.module';
import { AppSharedModule } from '../../../../../app/app.shared.module'; 
import { PublicProfileModule } from '../../../../web/pages/public-profile/public-profile.module';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule, 
    AppSharedModule,
    MyAccountModule,
    PublicProfileModule
  ]
})
export class UserModule { }
