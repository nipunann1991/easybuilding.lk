import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryOrderComponent } from './category-order.component';

const routes: Routes = [{ path: ':id', component: CategoryOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryOrderRoutingModule { }
