import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseSurfaceTypesComponent } from './house-surface-types.component';

const routes: Routes = [
  { path: '', component: HouseSurfaceTypesComponent },
  { path: ':id', component: HouseSurfaceTypesComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseSurfaceTypesRoutingModule { }
