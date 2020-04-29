import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountInfoRoutingModule } from './account-info-routing.module';
import { AccountInfoComponent } from './account-info.component';
import { AppSharedModule } from '../../../../app.shared.module'; 

@NgModule({
  declarations: [AccountInfoComponent],
  imports: [
    CommonModule,
    AccountInfoRoutingModule,
    AppSharedModule,  
  ]
})
export class AccountInfoModule { }
