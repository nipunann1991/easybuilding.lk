import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';


@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadProjectComponent implements OnInit {

  formGroup: FormGroup;
  companyID:any;

  public files: NgxFileDropEntry[] = []; 
  imageChangedEvent: any = '';
  isUploading: boolean = false;
  croppedImage: any = '';
  uploadedImages: any = [];
  uploadedFileName: any = [];

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,  
    private route: ActivatedRoute
  ) {  
    
    
  }

  ngOnInit(): void { 

    window.scroll(0,0);  

    this.formGroup = new FormGroup({ 

      project_name: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      project_description: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000)
      ]),

      project_year: new FormControl('',[
        Validators.required
      ]),

      project_cost: new FormControl('',[
        Validators.required
      ]), 

    });

    this.companyID = this.route.snapshot.params.company_id;
  }

  ngOnDestroy(){
    //alert();
  }

  openImgUpload(fileInput:any, profile_state){ 

    //fileInput.click();   
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
  
 
          const formData = new FormData()
          formData.append('file', file);
          formData.append('name', file.name);  
          formData.append('company_id', this.companyID)
          

          const promise = new Promise((resolve, reject) => { 
    
          this.myaccount.uploadProjectImages(formData)
              .toPromise()
              .then((response: any) => {
                
                this.uploadedImages.push(response.data.target_file);
                this.uploadedFileName.push(response.data.new_file);
                resolve();

              },
                err => {
                  // Error
                  reject(err);
                }
              );
          });
  
          return promise; 

        });

      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  

  fileChangeEvent(event: any): void { 
    this.imageChangedEvent = event;     
    let files =  this.imageChangedEvent.srcElement.files; 
    this.files = files;
    this.isUploading = true;
    for (const droppedFile of files) { 

      if (this.validateFile(droppedFile)) { 
        //this.openModal();
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

    onSave(){

      if (!this.formGroup.invalid) {
        this.formGroup.value.images = JSON.stringify(this.uploadedFileName); 
        this.formGroup.value.company_id = this.companyID; 
        this.formGroup.value.primary_img = this.uploadedFileName[0]; 
        this.formGroup.value.total_imgs = this.uploadedFileName.length; 
        
        console.log(this.formGroup.value)
        
        
        this.myaccount.addNewProjectDetails(this.formGroup.value)
          .subscribe((response: any) => {
  
            if (response.status == 200) { 
              this.toastr.success('Project added successfully', 'Success !');  
              
            }else if (response.status == 401){
              this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
            }else{
              this.toastr.error('Information saving failed. Please try again', 'Error !'); 
            }
              
          });
      }
  
    }


    

}
