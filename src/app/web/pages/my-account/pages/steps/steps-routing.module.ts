import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepsComponent } from './steps.component';

const routes: Routes = [{ 
  path: '', component: StepsComponent ,
  children: [  
      { path: 'account-info', loadChildren: () => import('../../pages/account-info/account-info.module').then(m => m.AccountInfoModule) },
      { path: 'contact-info', loadChildren: () => import('../../pages/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
      { path: 'service-areas', loadChildren: () => import('../../pages/service-areas/service-areas.module').then(m => m.ServiceAreasModule) },
    ] 
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepsRoutingModule { }
