import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core'; 
import { Router,ActivatedRoute,  NavigationEnd } from '@angular/router'; 
import { DataTableDirective } from 'angular-datatables';
import { ProductsService } from './services/products.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../../environments/environment"; 
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery'; 
import { Lightbox } from 'ng-gallery/lightbox';
import { Subject } from 'rxjs' 
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Options } from 'select2';  
import { Globals } from "../../../app.global"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject(); 
  units = this.globals.unitList;

  constructor(
    public gallery: Gallery,
    private products: ProductsService,
    private lightbox: Lightbox,
    public dialog: MatDialog,
    private globals: Globals,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false, 
        bStateSave: true,
        ajax: this.products.getProductsDT(), 
        columns: [ 
          { data: 'product_id' },{ data: 'product_name' }, { data: 'cat_lvl2_name' } , { data: 'display_name' },{ data: 'product_price' } 
        ],
        columnDefs: [{
          targets: 5,
          data: function( row, index ){      
     
            return that.units[ row.product_unit - 1].text; 
          }
        },{
        targets: 6,
        data: function( row, index ){      

          let imgURL = environment.uploadPath +row.client_id+"/"+row.company_id+"/products/"
          let imgURLThumb = imgURL +"thumb/" 

          return '<a class="view-image-products" data-client-id="' + row.client_id + '" data-company-id="' + row.company_id + '" data-provider-id="' + row.provider_id + '" data-product-id="' + row.product_id + '" title="Edit" ><img width="90" src="'+ imgURLThumb + row.primary_img+'" ></i></a> '; 
        }
      },{
        targets: 7,
        data: function( row ){    
          let badge = "";
          if(row.featured == 1){
            badge = " <span class='badge badge-warning'>F</span>";
          }

          return '<a class="view-image-products" data-client-id="' + row.client_id + '" data-company-id="' + row.company_id + '" data-provider-id="' + row.provider_id + '" data-product-id="' + row.product_id + '" title="View" >View</a> '+ badge;
          
        
            
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


    $('html').unbind("click").on('click', 'a.view-image-products' , function(e){ 
      e.preventDefault();   

      let userData = {
        client_id: $(this).attr('data-client-id'),
        company_id: $(this).attr('data-company-id'),
        provider_id: $(this).attr('data-provider-id'),
        product_id: $(this).attr('data-product-id')
      }

      that.navigateToProduct(userData);

    });

  }


  ngAfterViewInit(): void {
    this.dtTrigger.next(); 
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

  navigateToProduct(userData){
    this.router.navigate(['admin/users/user/'+userData.client_id+'/'+userData.provider_id+'/products/view-product/'+userData.company_id+'/'+userData.product_id+'']);
  }

}
