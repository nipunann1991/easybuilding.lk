import { Component, OnInit, ViewEncapsulation, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { ProfileService } from "../../../../admin/api/frontend/profile.service";
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service'; 
import { ModalManager } from 'ngb-modal';
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper';
import { FileSaverService, } from 'ngx-filesaver'; 
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';
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
  @ViewChild('uploadProfile') uploadProfile;
  @ViewChild('fileInput') fileInput;
  
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
  coverImage: any = "";
  profileImage: any = "";
  ClientId: any;
  companyId: any;
  userEmail: any = ""
  imageChangedEvent: any = '';
  croppedImage: any = '';
  modalTitle: any = '';
  optimizedImg: any;
  uploadStatus: number = 0;
  deleteStatus: number = 0; 
  aspectRatio: any = {
    x: 1400,
    y: 450
  };
  totalReviews: any;
  rating: any;
  

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService, 
    private globals: Globals,
    private ps: ProfileService,
    private router: Router,
    private modalService: ModalManager,
    private httpClient: HttpClient,
    private fileSaverService: FileSaverService,
    private fb: FacebookService
  ) {  

    const initParams: InitParams = {
      appId: environment.fb_provider, 
      xfbml: true,
      version: 'v2.9',
      
    };
 
    fb.init(initParams);

  }

  ngOnInit(): void { 
    
  }

  share() {
 
    const params: UIParams = {
      method: 'share',
      href: 'https://easybuilding.lk/ServiceProviders/MainIndex',
      display: 'popup',
     
    };
   
    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
   
  }

  ngOnChanges(){

    this.ps.userProfileData.subscribe(data => {
      this.profileData = data;   
      this.profile = this.profileData;
      this.ClientId = this.profileData.client_id;
      this.companyId = this.profileData.company_id;
      this.coverImage = this.profileData.cover_img;
      this.profileImage = this.profileData.profie_image;
      this.isEditable = this.profileData.is_editable_btn;
      this.userEmail = this.profileData.email;
      this.totalReviews = this.profile.total_reviews + " Reviews";
      this.rating = parseFloat(this.profile.rating).toFixed(1); 

      

      if(this.profileData.cover_img == "" ){
        this.isBgImage = false;

      }else{ 
        this.bgImage = 'url('+ environment.uploadPath + this.ClientId + '/'+ this.companyId + '/'+ this.coverImage +')' ; 
        this.isBgImage = true;
        
      }  

      if(this.profileData.profie_image == "" ){
        this.isProfImage = false; 

      }else{ 
        this.profImage = 'url('+ environment.uploadPath + this.ClientId + '/'+  this.companyId + '/'+ this.profileImage +')' ;
        this.isProfImage = true; 

      }  

      if(this.profile.display_name !== ""){
        this.isDisplayNameNull = false;
      }else{
        this.isDisplayNameNull = true;
      }
  
     });

    

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

  deleteImage(index){ 
    const component = this; 
    this.deleteStatus = parseInt(index);
    let title = "";

    if(this.deleteStatus == 1){
      title = "profile"
    }else{
      title = "cover"
    }

    let dialog = bootbox.confirm({
      title: "Delete "+ title +" Image",
      message: "Are you sure you need to delete the "+ title +"  image? Please note after you proceed it can be undone.",
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
      let param; let editParam; 
     
     
      if(this.deleteStatus==1){
        param = { company_id: this.companyId, client_id: this.ClientId, file_name: this.profileImage }; 
        editParam = { company_id: this.companyId, profie_image: "" }; 
      }else{
        param = { company_id: this.companyId, client_id: this.ClientId, file_name: this.coverImage }; 
        editParam = { company_id: this.companyId, cover_img: "" };
      }

      this.myaccount.updateProfileDetails(editParam)
        .toPromise()
        .then((response: any) => { 
          
          if(this.deleteStatus == 1){
            this.profImage = "transparent"
            this.isProfImage = false;  

          }else{
            this.bgImage = "transparent"
            this.isBgImage = false;  
          }
          
          this.myaccount.removeCoverImage(param).subscribe((response: any) => { }); 

            resolve();
        },
          err => {  reject(err);  }
        );
    });

    return promise; 
  }
 
  uploadProfileImage(blob){
    
    this.isUploading = true;
    var formData = new FormData();
    formData.append("file", blob);
    formData.append('name', "test");
    formData.append('company_id', this.companyId); 

     const promise = new Promise((resolve, reject) => { 
      
        this.myaccount.uploadProfileImage(formData)
          .toPromise()
          .then((response: any) => {
            
            if (response.status == 200) {   
               
              this.profImage = 'url('+response.data.target_file+')' ;
              this.isProfImage = true; 

              this.profileImage = response.data.new_file;

              let param = {
                company_id: this.companyId, 
                profie_image: response.data.new_file
              }

              this.myaccount.updateProfileDetails(param)
                .subscribe((response: any) => {

                  if (response.status == 200) {
                    this.toastr.success('Profile image updated successfully', 'Success !');  
                    
                  }else if (response.status == 401){
                    this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');

                  }else{
                    this.toastr.error('Profile image updating failed. Please try again', 'Error !'); 

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

              this.coverImage = response.data.new_file;

              let param = {
                company_id: this.companyId, 
                cover_img: response.data.new_file
              }

              this.myaccount.updateProfileDetails(param)
                .subscribe((response: any) => {

                  if (response.status == 200) {
                    this.toastr.success('Cover image updated successfully', 'Success !');  
                    
                  }else if (response.status == 401){
                    this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
                  }else{
                    this.toastr.error('Cover image updating failed. Please try again', 'Error !'); 
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


  openImgUpload(fileInput:any, profile_state){
    this.uploadStatus = profile_state;

    if(this.uploadStatus == 1){
      this.modalTitle = "Profile";
      this.aspectRatio = { x: 450, y: 450 }; 
    }else{
      this.modalTitle = "Cover";
      this.aspectRatio = { x: 1400, y: 450 };
    }

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

  editProfile(){ 
    this.isProfileEditable.emit(true); 
    this.isEditable = true;
    this.router.navigate(['/my-account/user/me/edit/account-info']);
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

 

  resizeMe(img) {
     
    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height; 
    
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    canvas.toBlob(blob => {  
       
      if(this.uploadStatus == 0){
        this.uploadCoverImage(blob)
      }else{
        this.uploadProfileImage(blob)
      }

    },"image/jpeg", 0.9); 

  }

}
