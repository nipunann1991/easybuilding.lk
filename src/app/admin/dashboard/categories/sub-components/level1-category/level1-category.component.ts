import { Component, OnInit, ViewChild } from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'
import { Globals } from "../../../../../app.global";
import { CategoriesService } from '../../services/categories.service'; 
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-level1-category',
  templateUrl: './level1-category.component.html',
  styleUrls: ['./level1-category.component.scss']
})
export class Level1CategoryComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtOptions: any = {};
	dtTrigger: Subject<any> = new Subject();
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
    private globals: Globals,
  ) { }

  ngOnInit(): void {

    this.getParentCategory();

    this.formGroup = new FormGroup({ 
      cat_lvl1_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      parent_cat_id: new FormControl('', [ 
          Validators.required, 
      ]), 

    }); 

    this.route.queryParams.subscribe(params => {
      this.param = params;

      if (Object.keys(this.param).length  !== 0 ) {
        this.isEditableRoute = true;;
        this.getSelectedLvl1Category();  
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
      ajax: this.categories.getLvl1CategoriesDT(), 
      columns: [ 
        { data: 'cat_lvl1_id' },{ data: 'cat_lvl1_name' },{ data: 'cat_name' }
      ],
      columnDefs: [{
      targets: 3,
      data: function( row ){   

        if(!that.globals.isManagerLogin()){
          return '<a class="edit-lvl1category-data" data-id="'+row.cat_lvl1_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
            '<a class="delete-lvl1category-data" onclick="a()" data-id="'+row.cat_lvl1_id+'" title="Delete"><i class="icon-bin"></i></a>'
        }else{
          return '<a class="edit-lvl1category-data" data-id="'+row.cat_lvl1_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
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

    $('html').on('click', 'a.delete-lvl1category-data' , function(e1){  
      e1.stopImmediatePropagation();
      e1.preventDefault();
      component1.openDeleteLvl1Modal($(this).attr('data-id'));  
      
    })
    
    const component = this;

    $('html').on('click', 'a.edit-lvl1category-data' , function(e){ 
      e.stopImmediatePropagation();
      e.preventDefault();
      component.editCategoryLvl1Page($(this).attr('data-id'));
      
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

  editCategoryLvl1Page(pageId){ 
    this.router.navigate(['admin/categories/level1-category/'], { queryParams:  {id: pageId} });
  }
  

  a(){
    alert();
  }
  
  onSubmit() { 

    if (!this.formGroup.invalid) {

      this.categories.addLvl1Category(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('New category has been added successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();

          }else{
              this.toastr.error('New category adding failed. Please try again', 'Error !'); 
          }
           
        }); 
    } 
    
  }

  onUpdate(){
    if (!this.formGroup.invalid) {
      this.formGroup.value.cat_lvl1_id = this.param.id;
      this.categories.editLvl1Category(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('Category level 1 has been edited successfully', 'Success !');  
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
		this.router.navigate(['admin/categories/level1-category']);
	}

  getSelectedLvl1Category(): void{
    let param = { cat_lvl1_id: this.param.id}
     
     this.categories.getSelectedLvl1Category(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.category = response.data[0];
          this.formGroup.setValue({cat_lvl1_name: this.category.cat_lvl1_name, parent_cat_id: this.category.parent_cat_id});
          //this.getSelectedParentCategory = parseInt(response.data[0].parent_cat_id); 

         }else{
             console.log(response)
         }
            
     }); 

   }

  openDeleteLvl1Modal(cat_id){ 
 
    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete Category Level 1", 
      message: "Are you sure you need to delete this?", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
        if(result){
          this.deleteLvl1Category(cat_id); 
        }  
      
    }); 
    
  }

  deleteLvl1Category(cat_id){
 
    this.formGroup.value.cat_lvl1_id = cat_id;
    
    this.categories.deleteLvl1Category(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('Category level 1 has been deleted successfully', 'Success !');  
          this.rerender();

        }else{
            this.toastr.error('Category level 1 deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	}

 

  getParentCategory(): void{
 
    this.categories.getMainCategories()
        .subscribe((response: any) => {

          let data = [];

          if (response.status == 200) { 

            response.data.forEach( (value, index) => {  

                data.push({ 
                  id: value.cat_id,
                  text: value.cat_name
                });

                this.parentCategory = data;
            });

          }else{
              console.log(response)
          }
           
    }); 

  }

}
