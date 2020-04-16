import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageContainerRoutingModule } from './page-container-routing.module';
import { PageContainerComponent } from './page-container.component';
import { HeaderModule } from '../../common/header/header.module';


@NgModule({
  declarations: [PageContainerComponent],
  imports: [
    CommonModule,
    PageContainerRoutingModule,
    HeaderModule
  ]
})
export class PageContainerModule { }
