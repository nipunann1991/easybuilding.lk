import { Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { ModalManager } from 'ngb-modal';
import { environment } from "../../../../../environments/environment";
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper'; 
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../services/settings.service'; 
import { Globals } from "../../../../app.global";
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.scss']
})
export class PageSettingsComponent implements OnInit {

  @ViewChild('fileInput') fileInput;
  @ViewChild('uploadCover') uploadCover;

  private modalRef;
  public files: NgxFileDropEntry[] = []; 
  
  optimizedImg: any;
  isUploading: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  slideList:any = [];
  bgImagePath: string = "";
  isExpanded: boolean = false;
  aspectRatio: any = {
    x: 1220,
    y: 600
  };

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService, 
    private modalService: ModalManager,
    private settings: SettingsService,
    private globals: Globals,
  ) { }

  ngOnInit(): void {
    this.getSlides();

  }


  openImgUpload(fileInput:any){    
      fileInput.click();   
  }

  fileChangeEvent(event: any): void { 
    this.imageChangedEvent = event;     
    let files =  this.imageChangedEvent.srcElement.files; 
    this.files = files;
    this.isUploading = true;
    for (const droppedFile of files) { 

      if (this.validateFile(droppedFile)) { 
        this.openModal();
      }else{
        this.isUploading = false;
      }
    } 
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64; 
  }


  imageLoaded() {
      // show cropper
  }
  cropperReady(sourceImageDimensions: Dimensions) { 
      console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
      // show message
  }

  saveImage(){
    console.log(this.croppedImage)
  }
 
  openModal(){
    this.modalRef = this.modalService.open(this.uploadCover, {
        size: "lg",
        modalClass: 'image-edit-modal',
        hideCloseButton: false,
        centered: true,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: false,
        backdropClass: "modal-backdrop"
    })  

  } 

  closeModal(){
    this.isUploading = false;
    this.fileInput.nativeElement.value = "";
    this.modalService.close(this.modalRef); 
  }


  resizeMe(img) {
     
    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height; 
    
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    canvas.toBlob(blob => {   
      this.uploadSliderImage(blob)
      
    },"image/jpeg", 0.9); 

  }

  validateFileExtention(file_name){

    let validFileExtensions = [".jpg", ".jpeg", ".png"]; 
    let isValid = false;
  
        for (var j = 0; j < validFileExtensions.length; j++) {
            var sCurExtension = validFileExtensions[j];
            if (file_name.substr(file_name.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                
                isValid = true; 
                break;
            }
        }
  
        return isValid;
  }

  validateFile(file){

    let isValid = true;
  
    if (!this.validateFileExtention(file.name)) {
          this.toastr.error('Invalid image extention. Please upload an image only with jpg, jpeg or png extentions.', 'Upload Error !');   
      isValid = false;
    } 
  
    return isValid;
  
  }

  onSave() {  
    let blob = this.dataURItoBlob(this.croppedImage); 
    this.optimizedImg = this.generateCanvas(blob);  
  }

  
  dataURItoBlob(dataURI) {
    
    var byteString = atob(dataURI.split(',')[1]); 
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0] 
    var ab = new ArrayBuffer(byteString.length); 
    var ia = new Uint8Array(ab);
   
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
   
    var blob = new Blob([ab], {type: "image/jpeg"}); 

    return blob 
  
  }

  generateCanvas(blob){
     
    window.URL = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(blob);  

    var image = new Image();
    image.src = blobURL;

    const that = this;
    let resizeMeToblob;

    return image.onload = function() { 
       that.resizeMe(image);
    }

  }
  
  fileOver(event){
    console.log(event);
  }

  fileLeave(event){
    console.log(event);
  }


  uploadSliderImage(blob){
    
    this.isUploading = true;
    var formData = new FormData();
    formData.append("file", blob);
    formData.append('name', "test");
 

     const promise = new Promise((resolve, reject) => { 
      
        this.settings.uploadSliderImage(formData)
          .toPromise()
          .then((response: any) => {
            
            if (response.status == 200) {   
                
            this.addSliderData(response.data.new_file)

            }else{
                
            } 

              resolve();
          },
            err => {
              
              reject(err);
            }
          );
      });

     return promise;
  }

  addSliderData(file_name){

    let param = { file_name: file_name}
    this.settings.addSliderDetails(param)
      .subscribe((response: any) => { 

        this.toastr.success('Slider image updated successfully', 'Success !');   
        this.closeModal();
        this.getSlides(true); 
  
      });
  
  }

  getSlides(isExpanded = false): void{ 
     
    this.settings.getSlides()
        .subscribe((response: any) => {

       if (response.status == 200) {  
        
          this.slideList = response.data
          this.bgImagePath = environment.uploadPath+"admin/home-slider/thumb/" ;  
          this.isExpanded = isExpanded;
          

        }else{
            console.log(response)
        }
           
    }); 

 }

 deleteSlideModal(i){

  this.isExpanded = false; 

  const dialogRef = this.globals.confirmDialogBox({ 
    title: "Delete Slider", 
    message: "Are you sure you need to delete this slider?", 
    isDelete: true,
    confirmBtn: "Yes, Delete",
    cancelBtn: 'No'
  });
   
  dialogRef.afterClosed().subscribe(result => {
       
      if(result){
        this.deleteSlider(i); 
      }  
    
  });  
  
 }


 deleteSlider(i): void{ 
    
  let param = { id: this.slideList[i].id }

  this.settings.deleteSlider(param)
      .subscribe((response: any) => {

     if (response.status == 200) {  
      
      this.toastr.success('Slider deleted successfully', 'Success !'); ;  
      this.getSlides();

      }else{
          console.log(response)
      }
         
  }); 

}

 getSlideData(i){

  let params = this.slideList[i];

  this.settings.editSliderDetails(params)
        .subscribe((response: any) => {

       if (response.status == 200) {  
        
        this.toastr.success('Slider data updated successfully', 'Success !'); ;  
          

        }else{
            console.log(response)
        }
           
    }); 
 
   console.log()
 }

}


