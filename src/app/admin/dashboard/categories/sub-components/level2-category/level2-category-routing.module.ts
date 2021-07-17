import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Level2CategoryComponent } from './level2-category.component';

const routes: Routes = [
  { path: '', component: Level2CategoryComponent },
  { path: ':id', component: Level2CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Level2CategoryRoutingModule { }
