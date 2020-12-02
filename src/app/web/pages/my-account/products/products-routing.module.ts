import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'edit-product/:company_id/:project_id', loadChildren: () => import('../../my-account/products/edit-product/edit-product.module').then(m => m.EditProductModule) }, 
  { path: 'upload-product/:company_id', loadChildren: () => import('../upload-product/upload-product.module').then(m => m.UploadProductModule) },
	
  //{ path: 'upload-product/:company_id', loadChildren: () => import('../../my-account/products/upload-product/upload-product.module').then(m => m.UploadProductModule) },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
