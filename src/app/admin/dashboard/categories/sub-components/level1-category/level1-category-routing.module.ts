import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Level1CategoryComponent } from './level1-category.component';

const routes: Routes = [
  { path: '', component: Level1CategoryComponent },
  { path: ':id', component: Level1CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Level1CategoryRoutingModule { }
