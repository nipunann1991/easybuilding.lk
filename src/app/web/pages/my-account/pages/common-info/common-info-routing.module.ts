import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonInfoComponent } from './common-info.component';

const routes: Routes = [{ path: '', component: CommonInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonInfoRoutingModule { }
