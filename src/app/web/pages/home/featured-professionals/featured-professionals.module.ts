import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedProfessionalsRoutingModule } from './featured-professionals-routing.module';
import { FeaturedProfessionalsComponent } from './featured-professionals.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [FeaturedProfessionalsComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    FeaturedProfessionalsRoutingModule
  ],
  exports: [FeaturedProfessionalsComponent]
})
export class FeaturedProfessionalsModule { }
