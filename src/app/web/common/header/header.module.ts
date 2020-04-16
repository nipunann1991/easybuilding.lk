import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedModule } from '../../../app.shared.module'
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    HeaderRoutingModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
