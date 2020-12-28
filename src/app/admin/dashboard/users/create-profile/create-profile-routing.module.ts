import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProfileComponent } from './create-profile.component';

const routes: Routes = [
  { path: '', component: CreateProfileComponent , children: [
      { path: 'create-account', loadChildren: () => import('../../../../web/pages/create-account/create-account.module').then(m => m.CreateAccountModule) },
      { path: 'steps', loadChildren: () => import('../../../../web/pages/my-account/steps/steps.module').then(m => m.StepsModule), 
        children: [  
          { path: 'account-info', loadChildren: () => import('../../../../web/pages/my-account/account-info/account-info.module').then(m => m.AccountInfoModule) },
          { path: 'contact-info', loadChildren: () => import('../../../../web/pages/my-account/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
          { path: 'service-areas', loadChildren: () => import('../../../../web/pages/my-account/service-areas/service-areas.module').then(m => m.ServiceAreasModule) },
        ] 
      },
    ]
  }, 
  
//   { path: 'steps', component: CreateProfileComponent, children: [  
//     { path: 'account-info', loadChildren: () => import('../../../../web/pages/my-account/account-info/account-info.module').then(m => m.AccountInfoModule) },
//     { path: 'contact-info', loadChildren: () => import('../../../../web/pages/my-account/contact-info/contact-info.module').then(m => m.ContactInfoModule) },
//     { path: 'service-areas', loadChildren: () => import('../../../../web/pages/my-account/service-areas/service-areas.module').then(m => m.ServiceAreasModule) },
//   ]  
// },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProfileRoutingModule { }
