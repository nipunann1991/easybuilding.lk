import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedProfessionalsComponent } from './featured-professionals.component';

const routes: Routes = [{ path: '', component: FeaturedProfessionalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedProfessionalsRoutingModule { }
