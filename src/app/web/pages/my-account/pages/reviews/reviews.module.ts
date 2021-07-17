import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews.component';
import { AppSharedModule } from '../../../../../app.shared.module';


@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    AppSharedModule,
  ],
  exports: [ReviewsComponent]
})
export class ReviewsModule { }
