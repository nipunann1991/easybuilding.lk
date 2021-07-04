import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: ':user/:provider_id', component: UserComponent, children: [ 
    { path: 'about', loadChildren: () => import("../../../../web/pages/my-account/about/about.module").then(m => m.AboutModule) }, 
    { path: 'projects', loadChildren: () => import('../../../../web/pages/my-account/projects/projects.module').then(m => m.ProjectsModule) },
    { path: 'reviews/:id', loadChildren: () => import('../../../../web/pages/my-account/reviews/reviews.module').then(m => m.ReviewsModule) },  
    { path: 'products', loadChildren: () => import('../../../../web/pages/my-account/products/products.module').then(m => m.ProductsModule) },
    { path: 'edit/settings', loadChildren: () => import('../../../../web/pages/my-account/settings/settings.module').then(m => m.SettingsModule) }, 
    { path: 'edit/account-info', loadChildren: () => import('../../../../web/pages/my-account/account-info/account-info.module').then(m => m.AccountInfoModule) },
    { path: 'edit/service-areas', loadChildren: () => import('../../../../web/pages/my-account/service-areas/service-areas.module').then(m => m.ServiceAreasModule) },
    { path: 'edit/contact-info', loadChildren: () => import('../../../../web/pages/my-account/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
  ]}, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
