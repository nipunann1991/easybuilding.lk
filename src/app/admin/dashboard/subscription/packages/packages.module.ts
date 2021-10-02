import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    AppSharedModule
  ]
})
export class PackagesModule { }
