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
    { path: 'my-account', canActivate: [AuthGuard], loadChildren: () => import('../../../web/pages/my-account/my-account.module').then(m => m.MyAccountModule) },
    { path: 'steps', canActivate: [AuthGuard], loadChildren: () => import('../my-account/steps/steps.module').then(m => m.StepsModule) },
    { path: 'my-account/user/me/0/:company_id/upload-project', canActivate: [AuthGuard], loadChildren: () => import('../my-account/upload-project/upload-project.module').then(m => m.UploadProjectModule) },
	  { path: 'my-account/projects/view-project/:company_id/:project_id', canActivate: [AuthGuard], loadChildren: () => import('../my-account/projects/view-project/view-project.module').then(m => m.ViewProjectModule) },

  ]},
  
	{ path: 'login', canActivate: [AuthDeactiveGuard], loadChildren: () => import('../../../web/pages/login/login.module').then(m => m.LoginModule) }, 
  
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule { }
