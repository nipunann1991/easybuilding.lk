import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: ':user/:provider_id', component: UserComponent, children: [ 
    { path: 'about', loadChildren: () => import("../../../../web/pages/my-account/about/about.module").then(m => m.AboutModule) }, 
    { path: 'projects', loadChildren: () => import('../../../../web/pages/my-account/projects/projects.module').then(m => m.ProjectsModule) },
    { path: 'reviews', loadChildren: () => import('../../../../web/pages/my-account/reviews/reviews.module').then(m => m.ReviewsModule) },  
     

  ]}, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
