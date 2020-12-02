import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadProductRoutingModule } from './upload-product-routing.module';
import { UploadProductComponent } from './upload-product.component';
import { AppSharedModule } from '../../../../app.shared.module'; 


@NgModule({
  declarations: [UploadProductComponent],
  imports: [
    CommonModule,
    UploadProductRoutingModule,
    AppSharedModule
  ]
})
export class UploadProductModule { }
