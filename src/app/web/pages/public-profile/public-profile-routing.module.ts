import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicProfileComponent } from './public-profile.component';

const routes: Routes = [
  //{ path: '', component: PublicProfileComponent }
  { path: ':user/:provider_id', component: PublicProfileComponent, 
    children: [ 
      { path: 'about', loadChildren: () => import('../my-account/about/about.module').then(m => m.AboutModule) }, 
	    { path: 'projects', loadChildren: () => import('../my-account/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'reviews', loadChildren: () => import('../my-account/reviews/reviews.module').then(m => m.ReviewsModule) },  
      { path: 'services', loadChildren: () => import('../my-account/services/services.module').then(m => m.ServicesModule) },   
    ] 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicProfileRoutingModule { }