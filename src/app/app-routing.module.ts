import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router'; 


const routes: Routes = [ 
	{ path: '', loadChildren: () => import('./web/pages/page-container/page-container.module').then(m => m.PageContainerModule) },  
	{ path: 'admin', loadChildren: () => import('./admin/dashboard/dashboard-container/dashboard-container.module').then(m => m.DashboardContainerModule) },
	{ path: '404-page-not-found', loadChildren: () => import('./web/pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
	//{ path: 'web/pages/my-account/service-areas/services-dialog-box', loadChildren: () => import('./web/pages/my-account/service-areas/services-dialog-box/services-dialog-box.module').then(m => m.ServicesDialogBoxModule) },
	//{ path: 'web/common/confim-dialog-box', loadChildren: () => import('./web/common/confim-dialog-box/confim-dialog-box.module').then(m => m.ConfimDialogBoxModule) },
	//{ path: 'web/common/dialog-box', loadChildren: () => import('./web/common/dialog-box/dialog-box.module').then(m => m.DialogBoxModule) },
	
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
 