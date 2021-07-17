import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceAreasComponent } from './service-areas.component';

const routes: Routes = [{ path: '', component: ServiceAreasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceAreasRoutingModule { }
