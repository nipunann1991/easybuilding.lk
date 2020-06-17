import { Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { ModalManager } from 'ngb-modal';
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper';
import { FileSaverService, } from 'ngx-filesaver';
import { FileSaverOptions, saveA, ResponseContentType  } from 'file-saver';
import { Globals } from "../../../../app.global";
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
   
  @Input() profileData: any;
  @Output() isProfileEditable = new EventEmitter<any>();
  @ViewChild('uploadCover') uploadCover;
  private modalRef;
  
  public files: NgxFileDropEntry[] = []; 
  
  profile: any = {}
  isDisplayNameNull: boolean = true;
  isEditable: boolean = false; 
  bgImage: any = "transparent"
  profImage: any = "transparent"
  isBgImage: boolean = false;
  isProfImage: boolean = false;
  isUploading: boolean = false;
  uploadedImage: any = "";
  ClientId: any;
  companyId: any;
  userEmail: any = ""
  imageChangedEvent: any = '';
  croppedImage: any = '';
  optimizedImg: any;

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService, 
    private globals: Globals,
    private router: Router,
    private modalService: ModalManager,
    private httpClient: HttpClient,
    private fileSaverService: FileSaverService,
  ) { }

  ngOnInit(): void { 
    
  }

  ngOnChanges(){

    this.profile = this.profileData;
    this.ClientId = this.profileData.client_id;
    this.companyId = this.profileData.company_id;
    this.uploadedImage = this.profileData.cover_img;
    this.isEditable = this.profileData.is_editable_btn;
    this.userEmail = this.profileData.email;

 

    if(this.profileData.cover_img === '' ){
      this.isBgImage = false;

    }else{ 
      this.bgImage = 'url('+ environment.uploadPath + this.ClientId + '/'+ this.companyId + '/'+ this.profileData.cover_img +')' ; 
      this.isBgImage = true;
      
    }  

    if(this.profileData.profie_image === '' ){
      this.isProfImage = false; 

    }else{ 
      this.profImage = 'url('+ environment.uploadPath + this.ClientId + '/'+  this.companyId + '/'+ this.profileData.profie_image +')' ;
      this.isProfImage = true; 

    }  

    if(this.profile.display_name !== ""){
      this.isDisplayNameNull = false;
    }else{
      this.isDisplayNameNull = true;
    }

  }
 


  

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          if (this.validateFile(file)) { 
            // this.isUploading = true;

            // const formData = new FormData()
            // formData.append('file', file);
            // formData.append('name', file.name);
            // formData.append('company_id', this.companyId);

          //  const promise = new Promise((resolve, reject) => { 
      
          //     this.myaccount.uploadCoverImage(formData)
          //       .toPromise()
          //       .then((response: any) => {
                  
          //         if (response.status == 200) {  
          //           console.log(response.data);
                    
                    
          //           this.bgImage = 'url('+response.data.target_file+')' ;
          //           this.isBgImage = true;
          //           this.isUploading = false;
    
          //           this.uploadedImage = response.data.new_file;

          //           let param = {
          //             company_id: this.companyId, 
          //             cover_img: response.data.new_file
          //           }

          //           this.myaccount.updateProfileDetails(param)
          //             .subscribe((response: any) => {

          //               if (response.status == 200) {
          //                 this.toastr.success('Information saved successfully', 'Success !');  
                          
          //               }else if (response.status == 401){
          //                 this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          //               }else{
          //                 this.toastr.error('Information saving failed. Please try again', 'Error !'); 
          //               }
                          
          //             });
     
          //         }else{
          //             console.log(response)
          //         }
    
                   
                  
          //           resolve();
          //       },
          //         err => {
                    
          //           reject(err);
          //         }
          //       );
          //   });
    
          //   return promise;
    
            
          }  
 
        });

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
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
  }else if(file.size > 1024000){
        this.toastr.error('Fle size too large. Please upload an image less than 1MB.', 'Upload Error !');    
    isValid = false;

  }

  return isValid;

}

  fileOver(event){
    console.log(event);
  }

  fileLeave(event){
    console.log(event);
  }

  deleteImage(){
    //alert(image);

    const component = this;
    let dialog = bootbox.confirm({
      title: "Delete Cover Image",
      message: "Are you sure you need to delete this cover image? After you proceed to delete it can be undone.",
      buttons: {
        confirm: {
          label: 'Yes, Delete',  
          className: 'btn-danger pull-left'
        },
        cancel: {
          label: 'No', 
          className: 'pull-right '
        }
      },
      callback: function (result) {
        
        if(result){
          component.deleteImgFromServer();
        }  
      } 
    });

    dialog.init(function(){
      $('html .modal-backdrop:not(:first)').remove();
    })

    dialog.on("shown.bs.modal", function() {  
      $('html .bootbox.modal:not(:first)').remove(); 
    });
  

  }

  deleteImgFromServer(){
    const promise = new Promise((resolve, reject) => {
 
      let param = { company_id: this.companyId, client_id: this.ClientId, file_name: this.uploadedImage };

      let editParam = {
        company_id: this.companyId,
        cover_img: ""
      }

      this.myaccount.updateProfileDetails(editParam)
        .toPromise()
        .then((response: any) => {

            this.bgImage = "transparent"
            this.isBgImage = false; 
            this.myaccount.removeCoverImage(param).subscribe((response: any) => { }); 

            resolve();
        },
          err => {  reject(err);  }
        );
    });

    return promise; 
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
      this.modalService.close(this.modalRef); 
  }

  editProfile(){
    this.isEditable = true;
    this.isProfileEditable.emit(true); 
    this.router.navigate(['/my-account/user/me/0/edit/account-info']);
  }


  onSave() {  
    let blob = this.dataURItoBlob(this.croppedImage); 
    this.optimizedImg = this.generateCanvas(blob);  
  }

  
  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: "image/jpeg"}); 

    return blob 
  
  }

  generateCanvas(blob){
     
    window.URL = window.URL || window.webkitURL;
    var blobURL = window.URL.createObjectURL(blob); // and get it's URL

    var image = new Image();
    image.src = blobURL;

    const that = this;
    let resizeMeToblob;;

    return image.onload = function() { 
       that.resizeMe(image);
    }

  }

 

  resizeMe(img) {
    
    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height; 
    
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    let imageUrl = canvas.toBlob(blob => { 

      this.uploadCoverImage(blob);  

    },"image/jpeg", 0.9); 

  }

  uploadCoverImage(blob){
    
    this.isUploading = true;
    var formData = new FormData();
    formData.append("file", blob);
    formData.append('name', "test");
    formData.append('company_id', this.companyId); 

     const promise = new Promise((resolve, reject) => { 
      
        this.myaccount.uploadCoverImage(formData)
          .toPromise()
          .then((response: any) => {
            
            if (response.status == 200) {   
               
              this.bgImage = 'url('+response.data.target_file+')' ;
              this.isBgImage = true;
              this.isUploading = false;

              this.uploadedImage = response.data.new_file;

              let param = {
                company_id: this.companyId, 
                cover_img: response.data.new_file
              }

              this.myaccount.updateProfileDetails(param)
                .subscribe((response: any) => {

                  if (response.status == 200) {
                    this.toastr.success('Information saved successfully', 'Success !');  
                    
                  }else if (response.status == 401){
                    this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
                  }else{
                    this.toastr.error('Information saving failed. Please try again', 'Error !'); 
                  }
                  this.imageChangedEvent = "";
                  this.closeModal();
                    
                });

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


  openCoverImgUpload(fileInput:any){
    fileInput.click(); 
  }

  fileChangeEvent(event: any): void { 
    this.imageChangedEvent = event;   
    let files =  this.imageChangedEvent.srcElement.files;

    this.files = files;
    for (const droppedFile of files) { 

      if (this.validateFile(droppedFile)) { 
        this.openModal();
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
      // cropper ready
      console.log('Cropper ready', sourceImageDimensions);
  }
  loadImageFailed() {
      // show message
  }

  saveImage(){
    console.log(this.croppedImage)
  }

}
