import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { environment } from "../../../../../../environments/environment";
import { DataTableDirective } from 'angular-datatables';
import { Options } from 'select2';
import { Subject } from 'rxjs'
import { CategoriesService } from '../../services/categories.service'; 
import { Globals } from "../../../../../app.global";
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; 
import { ImageCroppedEvent, Dimensions, ImageTransform } from 'ngx-image-cropper';
import { FileSaverService, } from 'ngx-filesaver'; 
import { ModalManager } from 'ngb-modal';
import * as $ from 'jquery';
declare const bootbox:any;


@Component({
  selector: 'app-level2-category',
  templateUrl: './level2-category.component.html',
  styleUrls: ['./level2-category.component.scss']
})
export class Level2CategoryComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  @ViewChild('uploadCover') uploadCover;
  @ViewChild('fileInput') fileInput;


	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  select2Options: Options;
  formGroup: FormGroup;
  isEditableRoute: boolean = false;
  isFeatured: boolean = false;
  isFeaturedCatFiltered: boolean = false;
  isFeaturedCatFilteredVal: number = 1;
  param: any = {};
  category: any = [];
  parentCategory: any = [];
  bgImage: any = "transparent";
  isBgImage: boolean = false;

  public files: NgxFileDropEntry[] = []; 
  private modalRef;
  isProfImage: boolean = false;
  isUploading: boolean = false;
  categoryImage: any = "";
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
    x: 800,
    y: 600
  };

  constructor(
    private categories: CategoriesService,
    private modalService: ModalManager,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private globals: Globals,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.getParentLvl1Category();

    this.select2Options = { 
      multiple: false,
      tags: true
    };

    this.formGroup = new FormGroup({ 
      cat_lvl2_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      parent_cat_id: new FormControl('CL11032', [ 
          Validators.required, 
      ]), 

    }); 

    this.route.queryParams.subscribe(params => {
      this.param = params;

      if (Object.keys(this.param).length  !== 0 ) {
        this.isEditableRoute = true;
        this.getSelectedLvl2Category();  
      }else{
        this.isEditableRoute = false;
      }
         
    });
 
    this.generateTable();

    const component1 = this;

    $('html').unbind("click").on('click', 'a.delete-lvl2category-data' , function(e1){ 
      e1.stopImmediatePropagation();
      e1.preventDefault(); 
      component1.openDeleteLvl2Modal($(this).attr('data-id'));  
      
    })
    
    const component = this;

    $('html').on('click', 'a.edit-lvl2category-data' , function(e){ 
      e.stopImmediatePropagation();
      e.preventDefault();
      component.editCategoryLvl2Page($(this).attr('data-id'));
      
    }); 

  }


  generateTable(){
    (this.isFeaturedCatFiltered)? this.isFeaturedCatFilteredVal = 1 : this.isFeaturedCatFilteredVal = 0;

      const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false, 
        stateSave: true,
        retrieve: true, 
        ajax: this.categories.getLvl2CategoriesDT(this.isFeaturedCatFilteredVal), 
        columns: [ 
          { data: 'cat_lvl2_id' },
        ],
        columnDefs: [{
          targets: 1,
          data: function( row ){    
            let badge = "";
            (row.featured == 1)? badge = '<span class="badge badge-warning">F</span>' : '';  
            
            return row.cat_lvl2_name + " "+ badge;
          },
      
        },{
          targets: 2,
          data: function( row ){    
            return row.cat_lvl1_name
          },
      
        },{
        targets: 3,
        data: function( row ){    

          if(!that.globals.isManagerLogin()){
            return '<a class="edit-lvl2category-data" data-id="'+row.cat_lvl2_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
            '<a class="delete-lvl2category-data" data-id="'+row.cat_lvl2_id+'" title="Delete"><i class="icon-bin"></i></a>' 
          }else{
            return '<a class="edit-lvl2category-data" data-id="'+row.cat_lvl2_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
            '<a class="disabled" title="Delete not allowed"><i class="icon-bin"></i></a>' 
          }

         
        },
    
      }],
      dom: 'lfrtip', 
      buttons: [ 
          {
                extend:    'copyHtml5',
                text:      '<i class="fa fa-files-o"></i> Copy',
                titleAttr: 'Copy'
            },
            {
                extend:    'excelHtml5',
                text:      '<i class="fa fa-file-excel-o"></i> Excel',
                titleAttr: 'Export to Excel'
            },
            {
                extend:    'csvHtml5',
                text:      '<i class="fa fa-file-text-o"></i> CSV',
                titleAttr: 'Export to CSV'
            },
            {
                extend:    'pdfHtml5',
                text:      '<i class="fa fa-file-pdf-o"></i> PDF',
                titleAttr: 'Export to PDF'
            }
      ],

    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  editCategoryLvl2Page(pageId){
    this.router.navigate(['admin/categories/level2-category/'], { queryParams:  {id: pageId} });
  }
  

  
  onSubmit() { 

    if (!this.formGroup.invalid) {
      
      (this.isFeatured)? this.formGroup.value.featured = 1 : this.formGroup.value.featured = 0 ;
 
      this.formGroup.value.file_name = this.categoryImage;

      this.categories.addLvl2Category(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.isBgImage = false;
            this.toastr.success('New category has been added successfully', 'Success !');   
            this.rerender();
            


          }else{
              this.toastr.error('New category adding failed. Please try again', 'Error !'); 
          }
           
        }); 

    } 
    
  }

  onUpdate(){
    if (!this.formGroup.invalid) {
        
        (this.isFeatured)? this.formGroup.value.featured = 1 : this.formGroup.value.featured = 0 ;
        this.formGroup.value.cat_lvl2_id = this.param.id;
        this.formGroup.value.file_name = this.categoryImage;

        this.categories.editLvl2Category(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.isBgImage = false;
            this.toastr.success('Category level 2 has been edited successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();
            this.returnBack(); 
           

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Category level 1 editing failed. Please try again', 'Error !'); 
          }
            
        });
    }
  }

  returnBack(): void{
		this.router.navigate(['admin/categories/level2-category']);
	}

  getSelectedLvl2Category(): void{
    let param = { cat_lvl2_id: this.param.id}
     
     this.categories.getSelectedLvl2Category(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.category = response.data[0];
          this.formGroup.setValue({cat_lvl2_name: this.category.cat_lvl2_name, parent_cat_id: this.category.parent_cat_id});
          this.bgImage = 'url('+ environment.uploadPath+"admin/category/thumb/"+this.category.file_name +')' ;
          this.categoryImage = this.category.file_name; 
          (parseInt(this.category.featured) == 1 )? this.isFeatured = true : this.isFeatured = false ; 
          (this.categoryImage !== "")? this.isBgImage = true : this.isBgImage = false;  

         }else{
             console.log(response)
         }
            
     }); 

   }

  openDeleteLvl2Modal(cat_id){ 

    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete Category Level 2", 
      message: "Are you sure you need to delete this?", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
        if(result){
          this.deleteLvl2Category(cat_id); 
        }  
      
    });
 
    
  }


  openDeleteLvl2Image(file){ 

    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete Image", 
      message: "Are you sure you need to delete this image?", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
        if(result){
          this.removeCategoryImages(file)
        }  
      
    });
 
    
  }

  deleteLvl2Category(cat_id){
 
    this.formGroup.value.cat_lvl2_id = cat_id;
    
    this.categories.deleteLvl2Category(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('Category level 1 has been deleted successfully', 'Success !');  
          this.rerender();

        }else{
            this.toastr.error('Category level 1 deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	} 
 
  getParentLvl1Category(): void{
 
    this.categories.getParentLvl1Categories()
        .subscribe((response: any) => {

          let data = [];

          if (response.status == 200) { 

            response.data.forEach( (value, index) => {  

                data.push({ 
                  id: value.cat_lvl1_id,
                  text: value.cat_lvl1_name
                });

                this.parentCategory = data;
            });

          }else{
              console.log(response)
          }
           
    }); 

  }


  removeCategoryImages(file_name){
 
    let param = {
      cat_lvl2_id: this.param.id,
      file_name: file_name
    }
    
    this.categories.removeCategoryImages(param)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('Category image has been deleted successfully', 'Success !');  
          this.getSelectedLvl2Category();  

        }else{
            this.toastr.error('Category image deleting failed. Please try again', 'Error !'); 
        }
          
      });
     
  }

  
  setFeatured(event){  
    this.isFeatured = event.checked  
  }


  filterFeatured(event: any){   

    let checked = event.checked;
    this.isFeaturedCatFiltered = checked; 
    
    this.generateTable();
    this.cdr.detectChanges();
    this.rerender(); 

  }
  

  openImgUpload(fileInput:any, profile_state){
    this.uploadStatus = profile_state;

    if(this.uploadStatus == 1){
      this.modalTitle = "Profile";
      this.aspectRatio = { x: 450, y: 450 }; 
    }else{
      this.modalTitle = "Cover";
      this.aspectRatio = { x: 800, y: 450 };
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
      this.toastr.info('Optimizing the file since sile size is too large.', 'Uploading');    
    // isValid = false;

  }

  return isValid;

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
      this.uploadCategoryImage(blob)

    },"image/jpeg", 0.9); 
 
  }

  uploadCategoryImage(blob){
    
    this.isUploading = true;
    var formData = new FormData();
    formData.append("file", blob);
    formData.append('name', "test");
    formData.append('company_id', this.companyId); 

     const promise = new Promise((resolve, reject) => { 
      
        this.categories.uploadCoverImage(formData)
          .toPromise()
          .then((response: any) => {
            
            if (response.status == 200) {   
               
              this.bgImage = 'url('+response.data.target_file+')' ;
              this.isBgImage = true;
              this.isUploading = false;

              this.categoryImage = response.data.new_file;
 
              this.closeModal(); 

            }else{
                
            } 

            //  resolve();
          },
            err => {
              
              reject(err);
            }
          );
      });

      return promise;
  }

}
