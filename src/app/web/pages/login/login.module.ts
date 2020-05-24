import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AppSharedModule } from '../../../app.shared.module';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AppSharedModule, 
    CommonModule, 
    LoginRoutingModule,
    HeaderModule,
   
  ]
})
export class LoginModule { }
