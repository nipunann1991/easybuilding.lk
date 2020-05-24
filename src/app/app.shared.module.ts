import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatFormFieldModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';
 
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule} from '@angular/material/dialog';  
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { HttpClientModule } from '@angular/common/http'; 
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { NgxFileDropModule } from 'ngx-file-drop'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

@NgModule({
  declarations: [
    
  ],
  imports: [ 
      FormsModule,
      ReactiveFormsModule,
      NgxFileDropModule,
      HttpClientModule, 
      DataTablesModule, 
      NgSelect2Module,
      MatButtonModule, 
      MatSlideToggleModule, 
      DragDropModule, 
      MatCheckboxModule, 
      MatNativeDateModule, 
      MatDialogModule, 
      MatFormFieldModule, 
      MatDatepickerModule, 
      CKEditorModule,
      ImageCropperModule,
      LoadingBarHttpClientModule,
      NgBootstrapFormValidationModule.forRoot(), 
    ],
  exports: [  
    FormsModule,
      ReactiveFormsModule,
      NgxFileDropModule,
      HttpClientModule, 
      DataTablesModule, 
      NgSelect2Module,
      MatButtonModule, 
      MatSlideToggleModule, 
      DragDropModule, 
      MatCheckboxModule, 
      MatNativeDateModule, 
      MatDialogModule, 
      MatFormFieldModule, 
      MatDatepickerModule, 
      CKEditorModule, 
      ImageCropperModule, 
      LoadingBarHttpClientModule,
      NgBootstrapFormValidationModule
    
  ],
  entryComponents: []
})
export class AppSharedModule {}
