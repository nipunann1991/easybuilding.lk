import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainCategoryRoutingModule } from './main-category-routing.module';
import { MainCategoryComponent } from './main-category.component';
import { AppSharedModule } from 'src/app/app.shared.module'; 


@NgModule({
  declarations: [MainCategoryComponent],
  imports: [ 
    CommonModule, 
    MainCategoryRoutingModule, 
    AppSharedModule, 
  ],
  exports: [MainCategoryComponent]
})
export class MainCategoryModule { }
