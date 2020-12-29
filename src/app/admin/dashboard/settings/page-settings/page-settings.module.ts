import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageSettingsRoutingModule } from './page-settings-routing.module';
import { PageSettingsComponent } from './page-settings.component';
import { AppSharedModule } from '../../../../../app/app.shared.module';

@NgModule({
  declarations: [PageSettingsComponent],
  imports: [
    CommonModule,
    PageSettingsRoutingModule,
    AppSharedModule,

  ]
})
export class PageSettingsModule { }
