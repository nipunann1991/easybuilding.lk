import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AppSharedModule } from '../../../../app/app.shared.module';
import { MainCategoryModule } from './main-category/main-category.module';


@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    AppSharedModule, 
    CategoriesRoutingModule,
    MainCategoryModule
  ],
  //exports: [CategoriesComponent]
})
export class CategoriesModule { }
