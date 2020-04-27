import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard  } from '../../auth/backend/auth-guard.service';
import { DashboardContainerComponent } from './dashboard-container.component';

const routes: Routes = [
  
  { path: '', component: DashboardContainerComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard',  loadChildren: () => import('./../../../admin/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
	    { path: 'clients', loadChildren: () => import('./../../../admin/dashboard/clients/clients.module').then(m => m.ClientsModule) },
      { path: 'settings',  loadChildren: () => import('./../../../admin/dashboard/settings/settings.module').then(m => m.SettingsModule) },
      { path: 'categories',  loadChildren: () => import('./../../../admin/dashboard/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'certification', loadChildren: () => import('./../../../admin/dashboard/certification/certification.module').then(m => m.CertificationModule) },
      { path: 'products', loadChildren: () => import('./../../../admin/dashboard/products/products.module').then(m => m.ProductsModule) },
      { path: 'location', loadChildren: () => import('./../../../admin/dashboard/location/location.module').then(m => m.LocationModule) },
      { path: 'reviews', loadChildren: () => import('./../../../admin/dashboard/reviews/reviews.module').then(m => m.ReviewsModule) },
      { path: 'services', loadChildren: () => import('./../../../admin/dashboard/services/services.module').then(m => m.ServicesModule) },
      //{ path: 'main-categories', loadChildren: () => import('./../../../admin/dashboard/categories/main-category/main-category.module').then(m => m.MainCategoryModule) },
    ]
  },
  { path: 'login', loadChildren: () => import('./../../../admin/dashboard/login/login.module').then(m => m.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardContainerRoutingModule { }
