import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicProfileComponent } from './public-profile.component';

const routes: Routes = [
  //{ path: '', component: PublicProfileComponent }
  { path: ':user/:provider_id', component: PublicProfileComponent, 
    children: [ 
      { path: 'about', loadChildren: () => import('../my-account/pages/about/about.module').then(m => m.AboutModule) }, 
      { path: 'projects', loadChildren: () => import('../my-account/pages/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'reviews/:id', loadChildren: () => import('../my-account/pages/reviews/reviews.module').then(m => m.ReviewsModule) },  
      { path: 'products', loadChildren: () => import('../my-account/pages/products/products.module').then(m => m.ProductsModule) }, 
    ] 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicProfileRoutingModule { }
