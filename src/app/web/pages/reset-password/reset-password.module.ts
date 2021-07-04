import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { AppSharedModule } from '../../../app.shared.module';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    AppSharedModule,
    CommonModule,
    ResetPasswordRoutingModule,
    HeaderModule
  ]
})
export class ResetPasswordModule { }
