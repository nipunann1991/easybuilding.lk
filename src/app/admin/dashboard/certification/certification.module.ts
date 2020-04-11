import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificationRoutingModule } from './certification-routing.module';
import { CertificationComponent } from './certification.component';


@NgModule({
  declarations: [CertificationComponent],
  imports: [
    CommonModule,
    CertificationRoutingModule
  ]
})
export class CertificationModule { }
