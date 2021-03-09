import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturedProductsRoutingModule } from './featured-products-routing.module';
import { FeaturedProductsComponent } from './featured-products.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [FeaturedProductsComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    FeaturedProductsRoutingModule
  ],
  exports: [FeaturedProductsComponent]
})
export class FeaturedProductsModule { }
