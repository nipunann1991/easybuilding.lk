import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitiesComponent } from './cities.component';

const routes: Routes = [
  { path: '', component: CitiesComponent },
  { path: ':id', component: CitiesComponent },
  { path: ':id/:prov_id', component: CitiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
