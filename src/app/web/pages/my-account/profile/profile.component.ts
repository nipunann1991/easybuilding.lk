import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../../../environments/environment";
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper';
import { Globals } from "../../../../app.global";
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   
  @Input() profileData: any;
  @Output() isProfileEditable = new EventEmitter<any>();

  
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

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService, 
    private globals: Globals
  ) { }

  ngOnInit(): void { 
    
  }

  ngOnChanges(){

    this.profile = this.profileData;
    this.ClientId = this.profileData.client_id;
    this.uploadedImage = this.profileData.cover_img;
    this.isEditable = this.profileData.is_editable_btn;
     

    if(this.profileData.cover_img === '' ){
      this.isBgImage = false;

    }else{ 
      this.bgImage = 'url('+ environment.uploadPath +  this.ClientId + '/'+ this.profileData.cover_img +')' ; 
      this.isBgImage = true;
      
    }  

    if(this.profileData.profie_image === '' ){
      this.isProfImage = false; 

    }else{ 
      this.profImage = 'url('+ environment.uploadPath +  this.ClientId + '/'+ this.profileData.profie_image +')' ;
      this.isProfImage = true; 

    }  

    if(this.profile.display_name !== ""){
      this.isDisplayNameNull = false;
    }else{
      this.isDisplayNameNull = true;
    }

  }

 


  editProfile(){
    this.isEditable = true;
    this.isProfileEditable.emit(true); 
  }
  

  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          if (this.validateFile(file)) {

            this.isUploading = true;

            const formData = new FormData()
            formData.append('file', file);
            formData.append('name', file.name);

           const promise = new Promise((resolve, reject) => { 
      
            this.myaccount.uploadCoverImage(formData)
                .toPromise()
                .then((response: any) => {
                  
                  if (response.status == 200) {  
                    console.log(response.data);
                    
                    
                    this.bgImage = 'url('+response.data.target_file+')' ;
                    this.isBgImage = true;
                    this.isUploading = false;
    
                    this.uploadedImage = response.data.new_file;

                    let param = {
                      client_id: this.ClientId,
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
                          
                      });
     
                  }else{
                      console.log(response)
                  }
    
                   
                  
                    resolve();
                },
                  err => {
                    // Error
                    reject(err);
                  }
                );
            });
    
            return promise;
    
            
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

         
      let param = { file_name: this.uploadedImage };

      let editParam = {
        client_id: this.ClientId,
        cover_img: ""
      }

      this.myaccount.updateProfileDetails(editParam)
        .toPromise()
        .then((response: any) => {

            this.bgImage = "transparent"
            this.isBgImage = false; 
            this.myaccount.removeFile(param).subscribe((response: any) => { }); 

            resolve();
        },
          err => {  reject(err);  }
        );
    });

    return promise; 
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
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

}
