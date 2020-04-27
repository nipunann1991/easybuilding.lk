import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Level2CategoryRoutingModule } from './level2-category-routing.module';
import { Level2CategoryComponent } from './level2-category.component';
import { AppSharedModule } from '../../../../../app/app.shared.module'; 


@NgModule({
  declarations: [Level2CategoryComponent],
  imports: [
    CommonModule,
    Level2CategoryRoutingModule,
    AppSharedModule, 
  ]
})
export class Level2CategoryModule { }
