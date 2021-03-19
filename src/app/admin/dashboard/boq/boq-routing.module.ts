import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoqComponent } from './boq.component';

const routes: Routes = [
  { path: '', component: BoqComponent, children:[
    { path: 'house-areas', loadChildren: () => import('./../../../admin/dashboard/boq/house-areas/house-areas.module').then(m => m.HouseAreasModule) },
    { path: 'house-surfaces', loadChildren: () => import('./../../../admin/dashboard/boq/house-surfaces/house-surfaces.module').then(m => m.HouseSurfacesModule) },
    { path: 'house-surface-types', loadChildren: () => import('./../../../admin/dashboard/boq/house-surface-types/house-surface-types.module').then(m => m.HouseSurfaceTypesModule) },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoqRoutingModule { }
