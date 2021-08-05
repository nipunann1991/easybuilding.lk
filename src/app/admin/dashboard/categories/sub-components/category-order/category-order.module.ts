import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryOrderRoutingModule } from './category-order-routing.module';
import { CategoryOrderComponent } from './category-order.component';
import { AppSharedModule } from '../../../../../app.shared.module';
import { IdeasCategoryModule } from 'src/app/web/pages/home/ideas-category/ideas-category.module';


@NgModule({
  declarations: [
    CategoryOrderComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    CategoryOrderRoutingModule,
    IdeasCategoryModule
  ]
})
export class CategoryOrderModule { }
