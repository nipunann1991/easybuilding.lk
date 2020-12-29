import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent, children: [
    { path: 'general', loadChildren: () => import('./general/general.module').then(m => m.GeneralModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'page-settings', loadChildren: () => import('./page-settings/page-settings.module').then(m => m.PageSettingsModule) },  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
