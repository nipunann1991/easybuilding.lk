import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageSearchRoutingModule } from './image-search-routing.module';
import { ImageSearchComponent } from './image-search.component';
import { AppSharedModule } from 'src/app/app.shared.module';


@NgModule({
  declarations: [ImageSearchComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ImageSearchRoutingModule
  ]
})
export class ImageSearchModule { }
