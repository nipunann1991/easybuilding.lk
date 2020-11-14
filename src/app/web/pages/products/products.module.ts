import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AppSharedModule } from '../../../app.shared.module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule, 
    AppSharedModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
