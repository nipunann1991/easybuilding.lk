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
    { path: 'my-account',  loadChildren: () => import('../../../web/pages/my-account/my-account.module').then(m => m.MyAccountModule) },
    { path: 'steps', canActivate: [AuthGuard], loadChildren: () => import('../my-account/steps/steps.module').then(m => m.StepsModule) },
    { path: 'user', loadChildren: () => import('../public-profile/public-profile.module').then(m => m.PublicProfileModule) },
  
    // canActivate: [AuthGuard],
  ]},

  
  
	{ path: 'login', canActivate: [AuthDeactiveGuard], loadChildren: () => import('../../../web/pages/login/login.module').then(m => m.LoginModule) }, 
	{ path: 'create-account', loadChildren: () => import('../../../web/pages/create-account/create-account.module').then(m => m.CreateAccountModule) },
  
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule { }
