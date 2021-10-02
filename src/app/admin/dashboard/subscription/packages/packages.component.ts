import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Globals } from "../../../../app.global";
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import { SubscriptionService } from "../services/subscription.service";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})

  dtElement: DataTableDirective;
	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;
  isEditableRoute: boolean = false;
  param: any = {};
  packages: any = [];
  public editor = ClassicEditor; 
  editorConfig: object = {
    apiKey: environment.tinyMCEAPI,
    config: this.globals.tinyMCEConfigMinimal()
  }

  constructor( 
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private globals: Globals,
    private subscription: SubscriptionService
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({ 
      package_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
      ]),

      price_per_month: new FormControl('', [
        Validators.required, 
      ]),  
      description: new FormControl('')
    }); 


    this.route.queryParams.subscribe(params => {
      this.param = params;

      if (Object.keys(this.param).length  !== 0 ) {
        this.isEditableRoute = true;;
        this.getPackage();

      }else{
        this.isEditableRoute = false;
      } 
    });


    const that = this;
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false, 
        stateSave: true,
        retrieve: true, 
        ajax: this.subscription.getPackagesDT(), 
        columns: [ 
          { data: 'id' },{ data: 'package_name' },{ data: 'price_per_month' }
        ],
        columnDefs: [{
        targets: 3,
        data: function( row ){   
          if(!that.globals.isManagerLogin()){
            return '<a class="edit-subscribe-data" data-id="'+row.id+'" title="Edit"><i class="icon-pencil"></i></a> '+
              '<a class="delete-subscribe-data" data-id="'+row.id+'" title="Delete"><i class="icon-bin"></i></a>'
          }else{
            return '<a class="edit-subscribe-data" data-id="'+row.id+'" title="Edit"><i class="icon-pencil"></i></a> '+
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

    const component1 = this;

		$('html').on('click', 'a.delete-subscribe-data' , function(e1){ 
      e1.stopImmediatePropagation();
			e1.preventDefault(); 
      component1.openDeleteModal($(this).attr('data-id'));   
			
    })
    
    const component = this;

		$('html').on('click', 'a.edit-subscribe-data' , function(e){ 
      e.stopImmediatePropagation();
			e.preventDefault();
      component.editPackage($(this).attr('data-id'));  
			
		});
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
        dtInstance.destroy();
        this.dtTrigger.next();
      });
  }

  returnBack(): void{
    this.formGroup.reset();
		this.router.navigate(['admin/subscription/packages']);
	}


  getPackage(): void{
    let param = { id: this.param.id}
     
     this.subscription.getPackage(param)
         .subscribe((response: any) => {

        if (response.status == 200) {  

          this.packages = response.data[0]; 
          this.formGroup.setValue({
            package_name: this.packages.package_name, 
            price_per_month: this.packages.price_per_month, 
            description: this.packages.description
          }); 

         }else{
             console.log(response)
         }
            
     }); 

  }

  editPackage(pageId){  
    this.router.navigate(['admin/subscription/packages'], { queryParams:  {id: pageId} });
  } 

  onSubmit() { 
    if (!this.formGroup.invalid) {

      this.subscription.addPackages(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('Package has been added successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();

          }else{
              this.toastr.error('Package adding failed. Please try again', 'Error !'); 
          }
           
        }); 

    }
  } 


  onUpdate(){
    if (!this.formGroup.invalid) {

      this.formGroup.value.id = this.param.id;
      this.subscription.editPackages(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('Package  has been edited successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();
            this.returnBack();

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Package editing failed. Please try again', 'Error !'); 
          }
            
        });
        
    }
  }


  openDeleteModal(id){ 

    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete Package", 
      message: "Are you sure you need to delete this?", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
        if(result){
         this.deletePackage(id);
         this.rerender();
        }  
      
    }); 
    
  }

  deletePackage(id){
 
    this.formGroup.value.id = id;
    
    this.subscription.deletePackage(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('Package has been deleted successfully', 'Success !');   

        }else{
            this.toastr.error('Package deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	} 

}
