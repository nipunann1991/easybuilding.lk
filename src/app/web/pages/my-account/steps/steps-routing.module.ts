import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StepsComponent } from './steps.component';

const routes: Routes = [{ 
  path: '', component: StepsComponent ,
  children: [  
      { path: 'account-info', loadChildren: () => import('../../my-account/account-info/account-info.module').then(m => m.AccountInfoModule) },
      { path: 'contact-info', loadChildren: () => import('../../my-account/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
    ] 
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepsRoutingModule { }
