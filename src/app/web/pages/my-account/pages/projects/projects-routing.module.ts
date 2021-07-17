import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'upload-project/:company_id', loadChildren: () => import('../upload-project/upload-project.module').then(m => m.UploadProjectModule) },
  { path: 'view-project/:company_id/:project_id', loadChildren: () => import('../projects/view-project/view-project.module').then(m => m.ViewProjectModule) },
  { path: 'edit-project/:company_id/:project_id', loadChildren: () => import('../projects/edit-project/edit-project.module').then(m => m.EditProjectModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
