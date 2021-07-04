import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AppSharedModule } from '../../../app.shared.module';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    AppSharedModule,
    CommonModule,
    ForgotPasswordRoutingModule,
    HeaderModule
  ]
})
export class ForgotPasswordModule { }
