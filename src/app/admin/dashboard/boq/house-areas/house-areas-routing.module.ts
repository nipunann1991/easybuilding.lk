import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseAreasComponent } from './house-areas.component';

const routes: Routes = [
  { path: '', component: HouseAreasComponent },
  { path: ':id', component: HouseAreasComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseAreasRoutingModule { }
