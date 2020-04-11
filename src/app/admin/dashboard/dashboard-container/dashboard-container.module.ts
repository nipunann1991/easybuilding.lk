import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSharedModule } from '../../../app.shared.module'
import { DashboardContainerRoutingModule } from './dashboard-container-routing.module';
import { DashboardContainerComponent } from './dashboard-container.component';
import { HeaderComponent } from "../../common/header/header.component";
import { NavComponent } from "../../common/nav/nav.component";

@NgModule({
  declarations: [
    DashboardContainerComponent, 
    HeaderComponent,
    NavComponent, 
  ],
  imports: [
    AppSharedModule,
    CommonModule,
    DashboardContainerRoutingModule,  
  ]
})
export class DashboardContainerModule { }
