import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';
import { AppSharedModule } from '../../../app.shared.module';
import { HeaderModule } from '../../common/header/header.module';

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [
    AppSharedModule,
    CommonModule,
    CreateAccountRoutingModule,
    HeaderModule,
  ]
})
export class CreateAccountModule { }
