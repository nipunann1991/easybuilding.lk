import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageContainerRoutingModule } from './page-container-routing.module';
import { PageContainerComponent } from './page-container.component';
import { HeaderModule } from '../../common/header/header.module';
import { FooterModule } from '../../common/footer/footer.module';
import { AppSharedModule } from '../../../app.shared.module';

@NgModule({
  declarations: [PageContainerComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    PageContainerRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class PageContainerModule { }
