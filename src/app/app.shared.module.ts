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
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { ChartsModule } from 'ng2-charts';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { HttpClientModule } from '@angular/common/http'; 
import { DataTablesModule } from 'angular-datatables';
import { NgSelect2Module } from 'ng-select2';
import { NgxFileDropModule } from 'ngx-file-drop'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'; 
import { ModalModule } from 'ngb-modal';
import { FileSaverModule } from 'ngx-filesaver';
import { FacebookModule } from 'ngx-facebook';
import { reviewDialog } from "../app/web/pages/my-account/pages/reviews/reviews.component";
import { FirstLetterPipe } from "../app/pipes/first-letter.pipe";
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { RoundToDecimalPipe } from './pipes/round-to-decimal.pipe';
import { OverlayscrollbarsModule } from "overlayscrollbars-ngx";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ConfimDialogBoxComponent } from './web/common/confim-dialog-box/confim-dialog-box.component';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    reviewDialog,
    FirstLetterPipe,
    TruncateTextPipe,
    RoundToDecimalPipe,
    ConfimDialogBoxComponent,
    HighlightTextPipe
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
      MatExpansionModule,
      MatTabsModule,
      MatSliderModule,
      MatIconModule,
      DragDropModule, 
      MatCheckboxModule, 
      MatNativeDateModule, 
      MatMenuModule,
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
      ChartsModule,
      OverlayscrollbarsModule,
      SlickCarouselModule, 
      NgxPaginationModule,
      EditorModule,
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
      MatTabsModule,
      MatSlideToggleModule, 
      MatSliderModule,
      MatMenuModule,
      DragDropModule, 
      MatExpansionModule,
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
      FileSaverModule,
      LoadingBarModule,
      GalleryModule,
      LightboxModule,
      ChartsModule,
      SlickCarouselModule,
      OverlayscrollbarsModule,
      NgBootstrapFormValidationModule,
      FirstLetterPipe,
      TruncateTextPipe,
      RoundToDecimalPipe,
      NgxPaginationModule,
      HighlightTextPipe,
      EditorModule
  ],
  entryComponents: [
    reviewDialog,
    ConfimDialogBoxComponent
  ]
})
export class AppSharedModule {}
