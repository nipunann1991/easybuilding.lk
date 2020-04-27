import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AppSharedModule } from '../../../app.shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AppSharedModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
