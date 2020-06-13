import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuardService as AuthGuard  } from '../../../admin/auth/frontend/auth-guard.service';
import { MyAccountComponent } from './my-account.component';

const routes: Routes = [
  { path: 'user/:id/:provider_id', component: MyAccountComponent, canActivate: [AuthGuard] , 
    children: [ 
      { path: 'about', loadChildren: () => import('../my-account/about/about.module').then(m => m.AboutModule) }, 
	    { path: 'projects', loadChildren: () => import('../my-account/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'reviews', loadChildren: () => import('../my-account/reviews/reviews.module').then(m => m.ReviewsModule) },  
      { path: 'services', loadChildren: () => import('../my-account/services/services.module').then(m => m.ServicesModule) }, 

      { path: 'edit/settings', loadChildren: () => import('../my-account/settings/settings.module').then(m => m.SettingsModule) }, 
	  	{ path: 'edit/account-info', loadChildren: () => import('../my-account/account-info/account-info.module').then(m => m.AccountInfoModule) },
      { path: 'edit/service-areas', loadChildren: () => import('../my-account/service-areas/service-areas.module').then(m => m.ServiceAreasModule) },
      { path: 'edit/contact-info', loadChildren: () => import('../my-account/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
      
    ] 
  }, 
  
  { path: '', redirectTo: 'user/me/0/about', canActivate: [AuthGuard], loadChildren: () => import('../my-account/user/user.module').then(m => m.UserModule) },
  
];

 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
