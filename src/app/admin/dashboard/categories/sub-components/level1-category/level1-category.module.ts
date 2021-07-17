import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Level1CategoryRoutingModule } from './level1-category-routing.module';
import { Level1CategoryComponent } from './level1-category.component';
import { AppSharedModule } from '../../../../../../app/app.shared.module'; 

@NgModule({
  declarations: [Level1CategoryComponent],
  imports: [
    CommonModule,
    Level1CategoryRoutingModule,
    AppSharedModule, 
  ]
})
export class Level1CategoryModule { }
