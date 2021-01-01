import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ImagesService } from '../../../admin/api/images.service';
import { environment } from "../../../../environments/environment"; 
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery'; 
import { Lightbox } from 'ng-gallery/lightbox';
import { Subject } from 'rxjs'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as $ from 'jquery';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
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
        ajax: this.imageservice.getImageDetailsDT(), 
        columns: [ 
          { data: 'img_id' },{ data: 'display_name' }, { data: 'project_name' },{ data: 'project_id' } 
        ],
        columnDefs: [{
        targets: 4,
        data: function( row, index ){      

          let imgURL = environment.uploadPath +row.client_id+"/"+row.company_id+"/projects/"
          let imgURLThumb = imgURL +"thumb/"
          
          let imgData = {
            src: imgURL+row.file_name,
            thumb: imgURLThumb+row.file_name
          }  
          return '<a class="view-image" title="Edit" data-id="'+index+'" data-client-id="'+row.client_id+'" data-company-id="'+row.company_id+'"  data-file="'+row.file_name+'" ><img width="90" src="'+ environment.uploadPath +"/"+row.client_id+"/"+row.company_id+"/projects/thumb/" +row.file_name+'" ></i></a> '; 
        }
      },{
        targets: 5,
        data: function( row ){    
          return "";
            
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
      let fileName = $(this).attr('data-file');

      let imgURL = environment.uploadPath +client_id+"/"+company_id+"/projects/"
      let imgURLThumb = imgURL +"thumb/"
      
      let imgData = {
        src: imgURL+fileName,
        thumb: imgURLThumb+fileName
      }    
     
      console.log(count)
      component.openDialog(imgData)

       
      
      
    });
 
  }

  
 

  ngAfterViewInit(): void {
    this.dtTrigger.next(); 
  }

 

  openDialog(imgData): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '1200px',
      data: {name: imgData.src }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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
        // Destroy the table first
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
  styleUrls: ['./photos.component.scss']
})

export class DialogOverviewExampleDialog {

  imgURL: string = ""

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) 
    {
      this.imgURL = data.name;
      console.log(this.imgURL);

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}