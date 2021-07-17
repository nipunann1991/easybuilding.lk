import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuardService as AuthGuard  } from '../../../admin/auth/frontend/auth-guard.service';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  

  { path: 'user/:user', component: MyAccountComponent, canActivate: [AuthGuard] , 
    children: [ 
      { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) }, 
	    { path: 'projects', loadChildren: () => import('../my-account/pages/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'reviews/:id', loadChildren: () => import('../my-account/pages/reviews/reviews.module').then(m => m.ReviewsModule) },  
      { path: 'products', loadChildren: () => import('../my-account/pages/products/products.module').then(m => m.ProductsModule) }, 
      { path: 'edit/settings', loadChildren: () => import('../my-account/pages/settings/settings.module').then(m => m.SettingsModule) }, 
	  	{ path: 'edit/account-info', loadChildren: () => import('../my-account/pages/account-info/account-info.module').then(m => m.AccountInfoModule) },
      { path: 'edit/service-areas', loadChildren: () => import('../my-account/pages/service-areas/service-areas.module').then(m => m.ServiceAreasModule) },
      { path: 'edit/contact-info', loadChildren: () => import('../my-account/pages/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
      
    ] 
  },   
 
  { path: '', redirectTo: 'user/me/about', canActivate: [AuthGuard], loadChildren: () => import('../my-account/pages/user/user.module').then(m => m.UserModule) },
  
];

 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
