import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSharedModule } from '../../../app.shared.module'
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AppSharedModule,
    CommonModule,  
    LoginRoutingModule
  ]
})
export class LoginModule { }
