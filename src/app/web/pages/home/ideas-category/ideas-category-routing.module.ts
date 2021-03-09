import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdeasCategoryComponent } from './ideas-category.component';

const routes: Routes = [{ path: '', component: IdeasCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasCategoryRoutingModule { }
