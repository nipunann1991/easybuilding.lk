import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
//import { MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatFormFieldModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';
import { MatButtonModule } from "@angular/material/button";
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import { MatDialogModule} from '@angular/material/dialog';  
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatRadioModule} from '@angular/material/radio';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { HttpClientModule } from '@angular/common/http'; 
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { NgxFileDropModule } from 'ngx-file-drop'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { StarRatingModule } from 'angular-star-rating';
import { ModalModule } from 'ngb-modal';
import { FileSaverModule } from 'ngx-filesaver';
import { FacebookModule } from 'ngx-facebook';
import { reviewDialog } from "../app/web/pages/my-account/reviews/reviews.component";
import { FirstLetterPipe } from "../app/pipes/first-letter.pipe";
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { RoundToDecimalPipe } from './pipes/round-to-decimal.pipe';

@NgModule({
  declarations: [
    reviewDialog,
    FirstLetterPipe,
    TruncateTextPipe,
    RoundToDecimalPipe
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
      MatSliderModule,
      MatIconModule,
      DragDropModule, 
      MatCheckboxModule, 
      MatNativeDateModule, 
      MatDialogModule, 
      MatFormFieldModule, 
      MatDatepickerModule, 
      CKEditorModule,
      ImageCropperModule,
      MatRadioModule,
      ModalModule,
      FileSaverModule,
      LoadingBarHttpClientModule,
      LoadingBarModule,
      GalleryModule,
      LightboxModule,
      StarRatingModule.forRoot(),
      NgBootstrapFormValidationModule.forRoot(), 
      FacebookModule.forRoot()
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
      MatSliderModule,
      DragDropModule, 
      MatCheckboxModule, 
      MatNativeDateModule, 
      MatDialogModule, 
      MatFormFieldModule, 
      MatIconModule,
      MatDatepickerModule, 
      CKEditorModule, 
      ImageCropperModule, 
      LoadingBarHttpClientModule,
      ModalModule,
      MatRadioModule,
      StarRatingModule,
      FileSaverModule,
      LoadingBarModule,
      GalleryModule,
      LightboxModule,
      NgBootstrapFormValidationModule,
      FirstLetterPipe,
      TruncateTextPipe,
      RoundToDecimalPipe
  ],
  entryComponents: [
    reviewDialog
  ]
})
export class AppSharedModule {}
