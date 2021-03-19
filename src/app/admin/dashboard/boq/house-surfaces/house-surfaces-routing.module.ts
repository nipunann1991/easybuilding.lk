import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseSurfacesComponent } from './house-surfaces.component';

const routes: Routes = [
  { path: '', component: HouseSurfacesComponent },
  { path: ':id', component: HouseSurfacesComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseSurfacesRoutingModule { }
