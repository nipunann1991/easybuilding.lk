import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ImagesService } from '../../../admin/api/images.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../../environments/environment"; 
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery'; 
import { Lightbox } from 'ng-gallery/lightbox';
import { Subject } from 'rxjs' 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Options } from 'select2'; 
import * as $ from 'jquery';


export interface DialogData {
  animal: string;
  name: string;
  img_details: string;
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhotosComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) 
 
	dtElement: DataTableDirective;
	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  galleryId = 'myLightbox';
  images: GalleryItem[] = [ ];
  count: number = 0;
  imagePath: string = ""
  animal: string;
  name: string;  
  DTlist = []; 

  constructor(
    public gallery: Gallery,
    private imageservice: ImagesService,
    private lightbox: Lightbox,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { 
 
    const that = this; 

    const galleryRef = this.gallery.ref(this.galleryId)

    galleryRef.load(this.images);

    galleryRef.setConfig({
      thumbPosition: 'right',
      imageSize: 'cover'
    }); 

    

    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false, 
        bStateSave: true,
        ajax: this.imageservice.getImageDetailsDT(), 
        columns: [ 
          { data: 'img_id' },{ data: 'display_name' }, { data: 'project_name' },{ data: 'project_id' } 
        ],
        columnDefs: [{
        targets: 4,
        data: function( row, index ){      

          let imgURL = environment.uploadPath +row.client_id+"/"+row.company_id+"/projects/"
          let imgURLThumb = imgURL +"thumb/" 

          return '<a class="view-image" title="Edit" data-id="'+index+'" data-image-photo_category=\`'+row.photo_category+'\` data-image-display_name="'+row.display_name+'"   data-image-project_name="'+row.project_name+'" data-client-id="'+row.client_id+'" data-approved="'+row.approved+'" data-image-id="'+row.img_id+'" data-company-id="'+row.company_id+'"  data-file="'+row.file_name+'" ><img width="90" src="'+ environment.uploadPath +"/"+row.client_id+"/"+row.company_id+"/projects/thumb/" +row.file_name+'" ></i></a> '; 
        }
      },{
        targets: 5,
        data: function( row ){    
          
          if(row.approved == 0){
            return "<span class='badge badge-warning'>Pending</span>";
          }else if(row.approved == 1){
            return "<span class='badge badge-success'>Approved</span>";
          }
         
            
        },
    
      }
    ],
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


    const component = this; 
    let count = 0

    $('html').unbind("click").on('click', 'a.view-image' , function(e){ 
      e.preventDefault();  

      count++

      let id = parseInt($(this).attr('data-id'));
      let client_id = $(this).attr('data-client-id');
      let company_id = $(this).attr('data-company-id');
      let img_id = $(this).attr('data-image-id');
      let photo_category_string = $(this).attr('data-image-photo_category') ;
      let photo_category = [];
      let fileName = $(this).attr('data-file');
      let project_name = $(this).attr('data-image-project_name');
      let display_name = $(this).attr('data-image-display_name');
      let approved = $(this).attr('data-approved');
      
      let imgURL = environment.uploadPath +client_id+"/"+company_id+"/projects/"
      let imgURLThumb = imgURL +"thumb/" 

      if(photo_category_string.slice(1, -1) == ''){
        photo_category = [];
      }else{ 
        photo_category = JSON.parse( photo_category_string.slice(1, -1))
      }

      let imgData = {
        src: imgURL+fileName,
        thumb: imgURLThumb+fileName,
        img_details: { display_name: display_name, project_name: project_name, img_id: img_id, approved: approved }
      }    
      
      component.openDialog(imgData) 
      
    });
 
  }

  
 

  ngAfterViewInit(): void {
    this.dtTrigger.next(); 
  }

 

  openDialog(imgData): void {
    const dialogRef = this.dialog.open(imageModalDialog, {
      width: '90%',
      data: {name: imgData.src, img_details: imgData.img_details  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.rerender();
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe(); 
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {  
      dtInstance.destroy();  
    });
  }

  rerender(){ 
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => { 
        dtInstance.destroy(); 
        this.dtTrigger.next();
      });
  }

  openInFullScreen(index: number, imgData:any ) {   
    console.log(this.images)
    this.lightbox.open(index);
  }

}



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: "photo-view.html",
  styleUrls: ['./photos.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class imageModalDialog {

  imgURL: string = "";
  imgDetails: any = {};
  categories: any = []; 
  formGroup: FormGroup;
  public options: Options;
  isApproved: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<imageModalDialog>,
    private imageservice: ImagesService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
    {
      this.imgURL = data.name; 
      this.imgDetails = data.img_details;

      console.log(this.imgDetails) 

      this.formGroup = new FormGroup({   
        photo_category: new FormControl("", [
          Validators.required
        ]),  
         
      });
  
      this.options = {
        multiple: true, 
        closeOnSelect: true, 
        tags: true 
      };

    }

  ngOnInit(): void {
      this.getImageCategories();
      this.getSingleImageCategory();
      

  }
 

  getImageCategories(){

    this.imageservice.getImageCategories() 
      .subscribe((response: any) => {
        if (response.status == 200) { 
          this.categories = response.data 
  
        }else{
            
        }
          
      });
  }

  

  getSingleImageCategory(){

    let param = { img_id: this.imgDetails.img_id}

    this.imageservice.getSingleImageCategory(param) 
      .subscribe((response: any) => {
        if (response.status == 200) { 

          let photo_category = []; 

          (response.data[0].photo_category == '')? photo_category = [] : photo_category = JSON.parse(response.data[0].photo_category);
           
          this.formGroup.setValue({ 
            photo_category: photo_category
          }); 
           
  
        }else{
            
        }
          
      });
  }

  closeDialog(response = false): void {
    this.dialogRef.close(response);
  }


  setApproved(event){  
    this.isApproved = event.checked 
  }

  onSave(){

    if (!this.formGroup.invalid) {

      this.formGroup.value.img_id = this.imgDetails.img_id; 
      this.formGroup.value.photo_category = JSON.stringify(this.formGroup.value.photo_category);  
      
      (this.isApproved)? this.formGroup.value.approved = 1 : this.formGroup.value.approved = 0 ;
  
      this.imageservice.saveImageCategories(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {

            this.toastr.success('Image category updated successfully', 'Success !');  
            this.closeDialog(true);
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 
          }
            
        }); 
       
    }

  }

}