import { Component, OnInit, ViewChild } from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Options } from 'select2';
import { Subject } from 'rxjs'
import { CategoriesService } from '../../../../admin/api/categories.service'; 
import * as $ from 'jquery';
declare const bootbox:any;


@Component({
  selector: 'app-level2-category',
  templateUrl: './level2-category.component.html',
  styleUrls: ['./level2-category.component.scss']
})
export class Level2CategoryComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})

	dtElement: DataTableDirective;
	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  select2Options: Options;
  formGroup: FormGroup;
  isEditableRoute: boolean = false;
  param: any = {};
  category: any = [];
  parentCategory: any = [];

  constructor(
    private categories: CategoriesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
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

      parent_cat_id: new FormControl('', [ 
          Validators.required, 
      ]), 

    }); 

    this.route.paramMap.subscribe(params => {
      this.param = params;

      if (typeof this.param.params.id !== 'undefined' ) {
        this.isEditableRoute = true;;
        this.getSelectedLvl2Category();  
      }
         
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      autoWidth: false, 
      ajax: this.categories.getLvl2CategoriesDT(), 
      columns: [ 
        { data: 'cat_lvl2_id' },{ data: 'cat_lvl2_name' },{ data: 'cat_lvl1_name' }
      ],
      columnDefs: [{
      targets: 3,
      data: function( row ){   

        return '<a class="edit-lvl2category-data" data-id="'+row.cat_lvl2_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
          '<a class="delete-lvl2category-data" data-id="'+row.cat_lvl2_id+'" title="Edit"><i class="icon-bin"></i></a>'
          
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

    $('html').on('click', 'a.delete-lvl2category-data' , function(e1){ 
      e1.preventDefault(); 
      component1.openDeleteLvl2Modal($(this).attr('data-id'));  
      
    })
    
    const component = this;

    $('html').on('click', 'a.edit-lvl2category-data' , function(e){ 
      e.preventDefault();
      component.editCategoryLvl2Page($(this).attr('data-id'));
      
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

  editCategoryLvl2Page(pageId){
		this.router.navigate(['admin/categories/level2-category/'+pageId]); 
  }
  
  
  onSubmit() { 

    if (!this.formGroup.invalid) {

      console.log(this.formGroup.value);

      this.categories.addLvl2Category(this.formGroup.value)
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
      this.formGroup.value.cat_lvl2_id = this.param.params.id;
      this.categories.editLvl2Category(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('Category level 1 has been edited successfully', 'Success !');  
            this.formGroup.reset();
            $('#refresh-btn').trigger('click');
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
    let param = { cat_lvl2_id: this.param.params.id}
     
     this.categories.getSelectedLvl2Category(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.category = response.data[0];
          this.formGroup.setValue({cat_lvl2_name: this.category.cat_lvl2_name, parent_cat_id: this.category.parent_cat_id});
          //this.getSelectedParentCategory = parseInt(response.data[0].parent_cat_id); 

         }else{
             console.log(response)
         }
            
     }); 

   }

  openDeleteLvl2Modal(cat_id){ 
    const component = this;
    let dialog = bootbox.confirm({
      title: "Delete Category Level 2",
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
          component.deleteLvl2Category(cat_id);
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

  deleteLvl2Category(cat_id){
 
    this.formGroup.value.cat_lvl1_id = cat_id;
    
    this.categories.deleteLvl1Category(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('Category level 1 has been deleted successfully', 'Success !');  
          $('#refresh-btn').trigger('click'); 

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


}
