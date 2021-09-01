import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ProjectsModule } from '../projects/projects.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { ProductsModule } from '../products/products.module';
import { CommonInfoModule } from '../common-info/common-info.module';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ProjectsModule,
    ReviewsModule,
    ProductsModule,
    CommonInfoModule
  ],
  exports: [AboutComponent]
})
export class AboutModule { }
