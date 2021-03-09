import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedProductsComponent } from './featured-products.component';

const routes: Routes = [{ path: '', component: FeaturedProductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedProductsRoutingModule { }
