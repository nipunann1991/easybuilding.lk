import { Component, OnInit, ViewChild } from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'
import { CategoriesService } from '../../../../admin/api/categories.service'; 
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.css']
})
export class MainCategoryComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})

	dtElement: DataTableDirective;
	dtOptions: any = {};
	dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;
  isEditableRoute: boolean = false;
  param: any = {};
  category: any = [];
  

  constructor(
    private categories: CategoriesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit(): void {
      
    this.formGroup = new FormGroup({ 
        cat_name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
    }); 

    this.route.paramMap.subscribe(params => {
      this.param = params;

      if (typeof this.param.params.id !== 'undefined' ) {
        this.isEditableRoute = true;;
        this.getSelectedMainCategory();  
      }
         
    });


    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false, 
        ajax: this.categories.getMainCategoriesDT(), 
        columns: [ 
          { data: 'cat_id' },{ data: 'cat_name' }
        ],
        columnDefs: [{
        targets: 2,
        data: function( row ){   

          return '<a class="edit-maincategory-data" data-id="'+row.cat_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
            '<a class="delete-maincategory-data" data-id="'+row.cat_id+'" title="Edit"><i class="icon-bin"></i></a>'
            
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

		$('html').on('click', 'a.delete-maincategory-data' , function(e1){ 
			e1.preventDefault(); 
			component1.openDeleteCustomerModal($(this).attr('data-id'));  
			
    })
    
    const component = this;

		$('html').on('click', 'a.edit-maincategory-data' , function(e){ 
			e.preventDefault();
		 	component.editCategoryPage($(this).attr('data-id'));
			
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
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
  }

  editCategoryPage(pageId){
		this.router.navigate(['admin/categories/main-categories/'+pageId]); 
  } 


  onSubmit() { 

    if (!this.formGroup.invalid) {

      this.categories.addMainCategory(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('New category has been added successfully', 'Success !');  
            this.formGroup.reset();
            $('#refresh-btn').trigger('click'); 

          }else{
              this.toastr.error('New category adding failed. Please try again', 'Error !'); 
          }
           
        }); 
    } 
    
  }

  onUpdate(){
    if (!this.formGroup.invalid) {
      this.formGroup.value.cat_id = this.param.params.id;
      this.categories.editMainCategory(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('Category has been edited successfully', 'Success !');  
            this.formGroup.reset();
            $('#refresh-btn').trigger('click');
            this.returnBack();

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Category editing failed. Please try again', 'Error !'); 
          }
            
        });
    }
  }

  returnBack(): void{
		this.router.navigate(['admin/categories/main-categories']);
	}

  getSelectedMainCategory(): void{
    let param = { cat_id: this.param.params.id}
     
     this.categories.getSelectedMainCategory(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.category = response.data[0];
          this.formGroup.setValue({cat_name: this.category.cat_name});
          //this.getSelectedParentCategory = parseInt(response.data[0].parent_cat_id); 

         }else{
             console.log(response)
         }
            
     }); 

  }

  openDeleteCustomerModal(cat_id){ 
    const component = this;
    let dialog = bootbox.confirm({
      title: "Delete Category",
      message: "Are you sure you need to delete this?",
      buttons: {
        confirm: {
          label: 'Yes',  
          className: 'btn-danger pull-left'
        },
        cancel: {
          label: 'No', 
          className: 'pull-right '
        }
      },
      callback: function (result) {
        
        if(result){
          component.deleteMainCategory(cat_id);
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

  deleteMainCategory(cat_id){
 
    this.formGroup.value.cat_id = cat_id;
    
    this.categories.deleteMainCategory(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('Category has been deleted successfully', 'Success !');  
          $('#refresh-btn').trigger('click'); 

        }else{
            this.toastr.error('Category deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	}

}
