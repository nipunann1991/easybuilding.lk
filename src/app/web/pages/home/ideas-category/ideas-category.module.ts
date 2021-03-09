import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeasCategoryRoutingModule } from './ideas-category-routing.module';
import { IdeasCategoryComponent } from './ideas-category.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [IdeasCategoryComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    IdeasCategoryRoutingModule
  ],
  exports: [IdeasCategoryComponent]
})
export class IdeasCategoryModule { }
