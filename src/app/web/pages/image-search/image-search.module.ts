import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageSearchRoutingModule } from './image-search-routing.module';
import { ImageSearchComponent } from './image-search.component';


@NgModule({
  declarations: [ImageSearchComponent],
  imports: [
    CommonModule,
    ImageSearchRoutingModule
  ]
})
export class ImageSearchModule { }
