import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper';
import { MyAccountService } from '../../../services/my-account.service';
import { ProfileService } from "../../profile/services/profile.service";
import { environment } from "../../../../../../../environments/environment";
import { Options } from 'select2';
import { Globals } from "../../../../../../app.global";
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProjectComponent implements OnInit {

  formGroup: FormGroup; 
  companyID:any;
  projectID:any;

  public options: Options;
  public files: NgxFileDropEntry[] = []; 
  imageChangedEvent: any = '';
  isUploading: boolean = false;
  isAdmin: boolean = false;
  croppedImage: any = '';
  uploadedImages: any = [];
  uploadedFileName: any = [];
  imageURL: string = "";
  mainImg: string = "";
  projectData: any = ""; 
  clientId:any;
  projectImages:any = [];
  projectImagesDeleted:any;
  imageURLThumb: string = "";
  allServices: any = [];
  nearestCity: any = [];
  isCustomLocation: boolean = false;

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,  
    private route: ActivatedRoute,
    private profile: ProfileService,
    private globals: Globals,
  ) { }

  ngOnInit(): void {

    window.scroll(0,0);  

    this.options = {
      multiple: true, 
      closeOnSelect: true, 
      tags: true 
    };

    this.profile.setfullScreenView(true);
    
    this.formGroup = new FormGroup({ 

      project_name: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      services: new FormControl('',[
        Validators.required
      ]), 

      project_address: new FormControl('',[
        Validators.required
      ]), 

      country_location: new FormControl(''),

      project_description: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000)
      ]),

      project_year: new FormControl(''),

      project_cost: new FormControl(''), 

      architect: new FormControl(''),

      contractor: new FormControl(''),

      structural_engineer: new FormControl(''),

    });

    this.companyID = this.route.snapshot.params.company_id; 
    this.projectID = this.route.snapshot.params.project_id; 

    (this.companyID == '0')? this.isAdmin = true : this.isAdmin = false; 
    (this.isAdmin)? this.getServicsforAdmin() : this.getProductsWithID(this.companyID); 
     
    this.getProjectDetails(this.companyID, this.projectID);
    this.getCities();
    
  }

  ngOnDestroy(){
  
  }

  openImgUpload(fileInput:any, profile_state){ 
 
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);

          console.log(file);

          const formData = new FormData()
          formData.append('file', file);
          formData.append('name', file.name);  
          formData.append('company_id', this.companyID)
          formData.append('project_id', this.projectID)
          

          const promise = new Promise((resolve, reject) => { 
    
          this.myaccount.uploadProjectImagesOnEdit(formData)
              .toPromise()
              .then((response: any) => {
                
                this.uploadedImages.push({ imgURL: response.data.target_file, approved: 0 });
                this.uploadedFileName.push({ imgURL: response.data.new_file, approved: 0 }); 
                
                //resolve();

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
    
    getProductsWithID(company_id){

      let params = { company_id: company_id }
  
      this.myaccount.getProductsWithID(params) 
        .subscribe((response: any) => {
          if (response.status == 200 ) {
             
            this.allServices = response.data
            this.getServicsWithID(company_id);
            
          }else{
            
          }
            
        });
    }

    getServicsWithID(company_id){

      let params = { company_id: company_id }
  
      this.myaccount.getServicsWithID(params) 
        .subscribe((response: any) => {
          if (response.status == 200 && response.data.length > 0 ) {
            
            var newArray = [];
           
            if(this.allServices.length == 0){
              newArray = this.allServices = response.data
            }else{
              newArray = this.allServices.concat(response.data)
            }
            
            this.allServices = newArray; 
  
          }else{
            
          }
            
        });
    }


    getServicsforAdmin(){

      this.myaccount.getServicsforAdmin() 
        .subscribe((response: any) => {
          if (response.status == 200 ) {
            this.allServices = response.data; 
          } 
            
        });
    }

    getProjectDetails(company_id, project_id){

      let params = { company_id: company_id, project_id: project_id }
  
      this.myaccount.getProjectDetails(params) 
        .subscribe((response: any) => {
          if (response.status == 200) {
             
  
            this.projectData = response.data; 
            this.projectImages = this.projectData.images; 
            this.clientId = this.projectData.client_id;
            this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/';
            this.imageURLThumb = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/thumb/';
            
            this.mainImg = this.imageURL + this.projectData.primary_img;

            this.formGroup.setValue({
              project_name: this.projectData.project_name,
              services: JSON.parse(this.projectData.services), 
              project_description: this.projectData.project_description, 
              project_year: this.projectData.project_year,
              project_address: this.projectData.project_address,
              project_cost: this.projectData.project_cost, 
              architect: this.projectData.architect, 
              contractor: this.projectData.contractor, 
              structural_engineer: this.projectData.structural_engineer, 
              country_location: this.projectData.country_location
            });

            (this.formGroup.controls['country_location'].value != '')? this.isCustomLocation = true : this.isCustomLocation = false;
            this.uploadedFileName =  this.projectImages;
  
            this.projectImages.forEach(element => {  
              this.uploadedImages.push({ imgURL: this.imageURLThumb + element.file_name, approved:  element.approved  }); 
            });
 
  
          }else{
            
          }
            
        });
  
    }

    onSave(isOnImageUpload = false){

      if (!this.formGroup.invalid) {
        this.formGroup.value.images = JSON.stringify(this.uploadedFileName); 
        this.formGroup.value.company_id = this.companyID;  
        
        this.formGroup.value.project_id = this.projectID; 
        this.formGroup.value.services = JSON.stringify(this.formGroup.value.services); 

        if(this.isCustomLocation){
          this.formGroup.value.project_address = 0;
        }else{
          this.formGroup.value.country_location = '';
        }
        
        this.myaccount.editProjectDetails(this.formGroup.value)
          .subscribe((response: any) => {
  
            if (response.status == 200) { 
              this.toastr.success('Project updated successfully', 'Success !');  
              (!isOnImageUpload)? window.history.back() : "" ;
              
            }else if (response.status == 401){
              this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
            }else{
              this.toastr.error('Project update failed. Please try again', 'Error !'); 
            }
              
          });
      }
  
    }


    deleteImage(index){  
   
      const dialogRef = this.globals.confirmDialogBox({ 
        title: "Delete Image",
        message: "Are you sure you need to delete this image? Please note after you proceed it can be undone.",
        isDelete: true,
        confirmBtn: "Yes, Delete",
        cancelBtn: 'No'
      });
       
      dialogRef.afterClosed().subscribe(result => {
           
          if(result){

            this.projectImagesDeleted = this.uploadedFileName[index];
            console.log(this.projectImagesDeleted)
          
            this.uploadedFileName.splice(index, 1); 
            this.uploadedImages = [];
  
            this.uploadedFileName.forEach(element => {  
              this.uploadedImages.push({ imgURL: this.imageURLThumb + element.file_name, approved:  element.approved  });  
            });  

            let param = { company_id: this.companyID, file_name: this.projectImagesDeleted.file_name}; 

            this.myaccount.removeProjectImages(param).subscribe((response: any) => { 
              this.projectImagesDeleted = ""; 
            }); 

            this.onSave(true);
             
          }  
        
      });
       
  
    }

    getCities(){ 

      this.myaccount.getCities() 
        .subscribe((response: any) => {
          if (response.status == 200) { 
            this.nearestCity = response.data;  
          }else{
              
          }
            
        });
    }

    goBack(){
      window.history.back();
    }


    setCustomLocation(e){
      this.isCustomLocation = e.checked;
      
      if(this.isCustomLocation){
        this.formGroup.controls['project_address'].setValue(0)
      } 
    }

}
