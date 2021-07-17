import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  { path: '',  component: CategoriesComponent, children: [
      { path: 'main-categories', loadChildren: () => import('./sub-components/main-category/main-category.module').then(m => m.MainCategoryModule) },
      { path: 'level1-category', loadChildren: () => import('./sub-components/level1-category/level1-category.module').then(m => m.Level1CategoryModule) },
	    { path: 'level2-category', loadChildren: () => import('./sub-components/level2-category/level2-category.module').then(m => m.Level2CategoryModule) },
    ]
  }, 
 
  { path: ':id', component: CategoriesComponent }, 
  
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
