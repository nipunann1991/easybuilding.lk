import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicProfileRoutingModule } from './public-profile-routing.module';
import { PublicProfileComponent } from './public-profile.component';
import { ProfileModule } from '../my-account/pages/profile/profile.module';
import { AppSharedModule } from '../../../app.shared.module';
import { MyAccountModule } from '../my-account/my-account.module';
import { AboutModule } from '../my-account/pages/about/about.module';

@NgModule({
  declarations: [PublicProfileComponent],
  imports: [
    CommonModule,
    PublicProfileRoutingModule,
    AppSharedModule,
    ProfileModule, 
    MyAccountModule,
    AboutModule
  ],
  exports: [PublicProfileComponent]
})
export class PublicProfileModule { }
