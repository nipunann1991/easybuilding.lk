import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Routes, Router, NavigationEnd} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ImagesService } from '../services/images.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../../../environments/environment"; 
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
  selector: 'app-uploaded-photos-list',
  templateUrl: './uploaded-photos-list.component.html',
  styleUrls: ['./uploaded-photos-list.component.scss']
})
export class UploadedPhotosListComponent implements OnInit {

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
    private router: Router,
    private imageservice: ImagesService,
    private lightbox: Lightbox,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { 
 
    const that = this; 

    this.tableOptions(); 

    const galleryRef = this.gallery.ref(this.galleryId)

    galleryRef.load(this.images);

    galleryRef.setConfig({
      thumbPosition: 'right',
      imageSize: 'cover'
    }); 
 
    const component = this; 
    let count = 0;

    $('html').on('click', '.view-client-data' , function(e){ 
      e.preventDefault();   
      component.viewClent($(this).attr('data-id'), $(this).attr('data-provider-id'));    
      return false;
    });

    $('html').on('click', '.view-project-data' , function(e){ 
      e.preventDefault();   
      component.viewProject($(this).attr('data-id'), $(this).attr('data-provider-id'), $(this).attr('data-company-id'), $(this).attr('data-project-id'));    
      return false;
    });

    $('html').on('click', 'a.view-image' , function(e1){ 
      e1.preventDefault();  

      count++

      let id = parseInt($(this).attr('data-id'));
      let client_id = $(this).attr('data-client-id');
      let company_id = $(this).attr('data-company-id');
      let img_id = $(this).attr('data-image-id');
      let photo_category_string = $(this).attr('data-image-photo_category') ;
      let photo_category = [];
      let fileName = $(this).attr('data-file');
      let project_name = $(this).attr('data-image-project_name');
      let project_id = $(this).attr('data-project-id');
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
        img_details: { display_name: display_name, project_name: project_name, project_id: project_id, img_id: img_id, approved: approved }
      }    
      
      component.openDialog(imgData) 
 
      
    });
 
  }

  tableOptions(){ 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      autoWidth: false, 
      bStateSave: true,
      ajax: this.imageservice.getImageDetailsDT(), 
      columns: [ 
        { data: 'img_id' }
      ],
      
      columnDefs: [
        {
          targets: 1,
          data: function( row ){    

            if(row.client_id == 0){
              return row.display_name;
            }else{
              return  '<a class="view-client-data" data-id="' + row.client_id + '" data-provider-id="' + row.provider_id + '/about" title="View">' +   row.display_name  + '</a> ';
            }
            
          }
        },
        {
          targets: 2,
          data: function( row ){     
 
            return  '<a class="view-project-data" data-id="' + row.client_id + '" data-company-id="' + row.company_id + '" data-project-id="' + row.project_id + '" data-provider-id="' + row.provider_id + '" title="View">' +   row.project_name   + '</a> ';
 
          }
      
        },{
          targets: 3,
          data: function( row ){    
            return row.project_id
          },
      
        },{
        targets: 4,
        data: function( row, index ){      

          let imgURL = environment.uploadPath +row.client_id+"/"+row.company_id+"/projects/"
          let imgURLThumb = imgURL +"thumb/" 

          return '<a class="view-image" title="Edit" data-id="'+index+'" data-image-photo_category=\`'+row.photo_category+'\` data-image-display_name="'+row.display_name+'" data-project-id="'+row.project_id+'"  data-image-project_name="'+row.project_name+'" data-client-id="'+row.client_id+'" data-approved="'+row.approved+'" data-image-id="'+row.img_id+'" data-company-id="'+row.company_id+'"  data-file="'+row.file_name+'" ><img width="90" src="'+ environment.uploadPath +"/"+row.client_id+"/"+row.company_id+"/projects/thumb/" +row.file_name+'" ></i></a> '; 
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

 
     
  }
  
  viewClent(id, provider_id){
    this.router.navigate(['admin/users/user/'+id+'/'+provider_id]); 
  }

  viewProject(id, provider_id, company_id, project_id){ 
    this.router.navigate(['admin/users/user/'+id+'/'+provider_id+'/projects/view-project/'+ company_id +'/'+project_id]); 
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();   
  }

 
  openDialog(imgData): void {
    const dialogRef = this.dialog.open(imageModalDialog, {
      width: '90%',
      maxHeight: '80vh',
      id: "image-dialog",
      data: {name: imgData.src, img_details: imgData.img_details }
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

    $('html').off('click');
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
  styleUrls: ['./uploaded-photos-list.component.scss'],
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
   
      ( this.imgDetails.approved == 1 )? this.isApproved = true :  this.isApproved = false;

      this.formGroup = new FormGroup({   
        photo_category: new FormControl(""),  
         
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
      this.formGroup.value.project_id = this.imgDetails.project_id; 
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