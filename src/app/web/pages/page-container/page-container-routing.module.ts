import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard  } from '../../../admin/auth/frontend/auth-guard.service';
import { AuthDeactivateGuardService as AuthDeactiveGuard  } from '../../../admin/auth/frontend/auth-deactivate-guard.service';
import { PageContainerComponent } from './page-container.component';

const routes: Routes = [{ path: '', component: PageContainerComponent, children: [
    { path: '', loadChildren: () => import('../../../web/pages/home/home.module').then(m => m.HomeModule) },
    { path: 'contact', loadChildren: () => import('../../../web/pages/contact/contact.module').then(m => m.ContactModule) },
    { path: 'products', loadChildren: () => import('../../../web/pages/products/products.module').then(m => m.ProductsModule) },
    { path: 'products/:id', loadChildren: () => import('../../../web/pages/products/products.module').then(m => m.ProductsModule) }, 
    { path: 'services/:id', loadChildren: () => import('../../../web/pages/products/products.module').then(m => m.ProductsModule) }, 
    { path: 'photos/:id', loadChildren: () => import('../../../web/pages/products/products.module').then(m => m.ProductsModule) }, 
    { path: 'image-search/:id', loadChildren: () => import('../../../web/pages/image-search/image-search.module').then(m => m.ImageSearchModule) },
    { path: 'my-account',  loadChildren: () => import('../../../web/pages/my-account/my-account.module').then(m => m.MyAccountModule) },
    { path: 'steps', canActivate: [AuthGuard], loadChildren: () => import('../my-account/steps/steps.module').then(m => m.StepsModule) },
    { path: 'user', loadChildren: () => import('../public-profile/public-profile.module').then(m => m.PublicProfileModule) },
	  { path: 'create-boq', loadChildren: () => import('../../../web/pages/create-boq/create-boq.module').then(m => m.CreateBoqModule) },
    { path: 'privacy-policy', loadChildren: () => import('../../../web/pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
    { path: 'about-us', loadChildren: () => import('../../../web/pages/about-us/about-us.module').then(m => m.AboutUsModule) },
	
    // canActivate: [AuthGuard],
  ]},

  
  
	{ path: 'login', canActivate: [AuthDeactiveGuard], loadChildren: () => import('../../../web/pages/login/login.module').then(m => m.LoginModule) }, 
	{ path: 'create-account', loadChildren: () => import('../../../web/pages/create-account/create-account.module').then(m => m.CreateAccountModule) },
	{ path: 'forgot-password', loadChildren: () => import('../../../web/pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'reset-password', loadChildren: () => import('../../../web/pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
 
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule { }
