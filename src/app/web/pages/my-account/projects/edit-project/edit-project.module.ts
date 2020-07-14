import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProjectRoutingModule } from './edit-project-routing.module';
import { EditProjectComponent } from './edit-project.component';
import { AppSharedModule } from '../../../../../app.shared.module';

@NgModule({
  declarations: [EditProjectComponent],
  imports: [
    CommonModule,
    EditProjectRoutingModule,
    AppSharedModule
  ]
})
export class EditProjectModule { }
