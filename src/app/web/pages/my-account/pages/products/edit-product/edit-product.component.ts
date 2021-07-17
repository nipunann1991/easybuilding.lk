import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyAccountService } from '../../../services/my-account.service';
import { environment } from "../../../../../../../environments/environment";
import { Globals } from "../../../../../../app.global";
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProductComponent implements OnInit {
  public Editor = ClassicEditor;
  formGroup: FormGroup;
  companyID:any;
  productID:any; 
  projectData: any = "";
  projectImages:any = []; 
  public files: NgxFileDropEntry[] = []; 
  imageChangedEvent: any = '';
  isUploading: boolean = false;
  croppedImage: any = '';
  uploadedImages: any = [];
  uploadedFileName: any = [];
  allProducts: any = [];
  projectImagesDeleted:any;
  imageURLThumb: string = "";
  imageURL: string = ""; 
  allUnits: any = this.globals.unitList;
  isContactForPrice: boolean = false;

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,  
    private route: ActivatedRoute,
    private location: Location,
    private globals: Globals,
  ) {  
    
    
  }

  ngOnInit(): void {
    window.scroll(0,0);  

    this.formGroup = new FormGroup({ 

      product_name: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
       
      product_category: new FormControl('',[
        Validators.required
      ]),
 

      product_price: new FormControl('',[
        Validators.required
      ]),
      product_unit: new FormControl('',[
        Validators.required
      ]),
      product_desc: new FormControl('',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(1000)
      ]), 

    
 
    });

    this.companyID = this.route.snapshot.params.company_id;
    this.productID = this.route.snapshot.params.project_id;
  
    this.getProductsWithID(this.companyID);
    this.getProductDetails(this.companyID, this.productID);
  }

  goBack(){
    this.location.back();
  }

  getProductsWithID(company_id){

    let params = { company_id: company_id }

    this.myaccount.getProductsWithID(params) 
      .subscribe((response: any) => {
        if (response.status == 200 ) {
           
          this.allProducts = response.data;  
          this.getServicsWithID(company_id);

        }else{
          
        }
          
      });
  }
  

  getServicsWithID(company_id){

    let params = { company_id: company_id }

    this.myaccount.getServicsWithID(params) 
      .subscribe((response: any) => {
        if (response.status == 200) {
          
          var newArray = this.allProducts.concat(response.data)
          this.allProducts = newArray; 
          console.log(this.allProducts);

        }else{
          
        }
          
      });
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
    
          this.myaccount.uploadProductImages(formData)
              .toPromise()
              .then((response: any) => {
                
                this.uploadedImages.push(response.data.target_file);
                this.uploadedFileName.push(response.data.new_file);

                console.log(this.uploadedImages, this.uploadedFileName)
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
      //this.croppedImage = event.base64; 
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
    //console.log(this.croppedImage)
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

  setContactForPrice(event){
    this.isContactForPrice = event.checked;

    if(this.isContactForPrice){
      this.formGroup.controls.product_price.setValue(0)
      this.formGroup.controls.product_unit.setValue(1) 
    }
  }

  getProductDetails(company_id, product_id){

    let params = { company_id: company_id, product_id: product_id }

    this.myaccount.getProductDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200) {
            
          this.projectData = response.data[0];
          
          this.projectImages = JSON.parse(this.projectData.images);
          this.imageURL = environment.uploadPath + this.projectData.client_id +'/'+ this.companyID +'/products/';
          this.imageURLThumb = environment.uploadPath + this.projectData.client_id +'/'+ this.companyID +'/products/thumb/';

          this.formGroup.setValue({
            product_name: this.projectData.product_name,
            product_category: this.projectData.product_category, 
            product_desc: this.projectData.product_desc,  
            product_price: this.projectData.product_price, 
            product_unit: this.projectData.product_unit 
            
          });

          (this.projectData.product_price == 0)? this.isContactForPrice = true : this.isContactForPrice = false;
          
          this.uploadedFileName =  this.projectImages;

          this.projectImages.forEach(element => {  
            this.uploadedImages.push(this.imageURLThumb + element); 
          });


        }else{
          
        }
          
      });

  }

  onSave(){

    if (!this.formGroup.invalid) {
      this.formGroup.value.images = JSON.stringify(this.uploadedFileName); 
      this.formGroup.value.company_id = this.companyID; 
      this.formGroup.value.primary_img = this.uploadedFileName[0]; 
      this.formGroup.value.product_id = this.productID; 
      this.formGroup.value.total_imgs = this.uploadedFileName.length;  

      if(this.isContactForPrice){
        this.formGroup.value.product_price = 0
        this.formGroup.value.product_unit = 1 
      }
 
      
      this.myaccount.editProductDetails(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) { 
            this.toastr.success('Project added successfully', 'Success !');  
            window.history.back();
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 
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

          this.uploadedFileName.splice(index, 1); 
          this.uploadedImages.splice(index, 1) 

          let param = { company_id: this.companyID, file_name: this.projectImagesDeleted }; 

          this.myaccount.removeProductImages(param).subscribe((response: any) => { 
            this.projectImagesDeleted = ""; 
          }); 
        }  
      
    }); 
   
  }

}
