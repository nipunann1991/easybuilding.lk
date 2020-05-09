import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MyAccountModule } from '../../../web/pages/my-account/my-account.module';
import { GeneralModule } from './general/general.module';
import { AppSharedModule } from '../../../../app/app.shared.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    AppSharedModule, 
    SettingsRoutingModule,
    MyAccountModule,
    GeneralModule
  ]
})
export class SettingsModule { }
