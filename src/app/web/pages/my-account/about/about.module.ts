import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { ProjectsModule } from '../projects/projects.module';
import { ReviewsModule } from '../reviews/reviews.module';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ProjectsModule,
    ReviewsModule
  ],
  exports: [AboutComponent]
})
export class AboutModule { }
