import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AppSharedModule } from '../../../../../app/app.shared.module'; 


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
