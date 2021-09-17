import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router'; 


const routes: Routes = [ 
	{ path: '', loadChildren: () => import('./web/pages/page-container/page-container.module').then(m => m.PageContainerModule) },  
	{ path: 'admin', loadChildren: () => import('./admin/dashboard/dashboard-container/dashboard-container.module').then(m => m.DashboardContainerModule) },
	{ path: '404-page-not-found', loadChildren: () => import('./web/pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
	{ path: 'admin/dashboard/users/handover-profile', loadChildren: () => import('./admin/dashboard/users/handover-profile/handover-profile.module').then(m => m.HandoverProfileModule) },
	{ path: '**', redirectTo: '/404-page-not-found' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    paramsInheritanceStrategy: 'always',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 