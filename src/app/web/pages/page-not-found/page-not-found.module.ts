import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { HeaderModule } from '../../common/header/header.module';
import { FooterModule } from '../../common/footer/footer.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule, 
    HeaderModule,
    FooterModule
  ]
})
export class PageNotFoundModule { }
