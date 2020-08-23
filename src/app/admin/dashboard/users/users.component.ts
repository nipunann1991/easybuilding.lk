import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { ClientsService } from '../../api/clients.service'; 
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-clients',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})

	dtElement: DataTableDirective;
	dtOptions: any = {};
	dtTrigger: Subject<any> = new Subject();

  constructor(
    private clients: ClientsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      autoWidth: false, 
      ajax: this.clients.getClientDetailsDT(), 
      columns: [ 
        { data: 'client_id' }
      ],
      columnDefs: [
      {
        targets: 1,
        data: function( row ){    
          return row.first_name+" "+ row.last_name
        },
        
      },
      {
        targets: 2,
        data: function( row ){    
          return row.email 
        },
        
      },
      {
        targets: 3,
        data: function (row) { 
          return row.provider;
        },
        
      },
      {
        targets: 4,
        data: function( row ){    
          return  '<a class="view-client-data" data-id="' + row.client_id + '" data-provider-id="' + row.provider_id + '/about" title="View">' +   row.display_name  + '</i></a> ';
        },
        
      },{
        targets: 5,
        data: function( row ){    
          if(row.status == 0){
            return '<span class="badge badge-danger">Inactive</span>';

          }else if(row.status == 1){
            return '<span class="badge badge-success">Active</span>';

          }else if(row.status == 2){
            return '<span class="badge badge-success">Active - A</span>';

          }
         
        },
        
      },{
        targets: 6,
        data: function( row ){   

          return ""
            
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
    

    $('html').on('click', 'a.view-client-data' , function(e1){ 
      e1.preventDefault(); 
      component1.viewClent($(this).attr('data-id'), $(this).attr('data-provider-id'));  
      
    })

    
    const component = this;

    $('html').on('click', 'a.edit-maincategory-data' , function(e){ 
      e.preventDefault();
      component.editCategoryPage($(this).attr('data-id'));
      
    });
  }


  viewClent(id, provider_id){
    this.router.navigate(['admin/users/user/'+id+'/'+provider_id]);
    //window.open('admin/users/user/'+id+'/'+provider_id, '_blank');
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
		//this.router.navigate(['admin/categories/main-categories/'+pageId]); 
  } 

 

  returnBack(): void{
		//this.router.navigate(['admin/categories/main-categories']);
	}

  getSelectedMainCategory(): void{
    // let param = { cat_id: this.param.params.id}
     
    //  this.categories.getSelectedMainCategory(param)
    //      .subscribe((response: any) => {

    //     if (response.status == 200) { 
         
    //       this.category = response.data[0];
    //       this.formGroup.setValue({cat_name: this.category.cat_name});
    //       //this.getSelectedParentCategory = parseInt(response.data[0].parent_cat_id); 

    //      }else{
    //          console.log(response)
    //      }
            
    //  }); 

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
 
    // this.formGroup.value.cat_id = cat_id;
    
    // this.categories.deleteMainCategory(this.formGroup.value)
    //   .subscribe((response: any) => {

    //     if (response.status == 200) {
    //       this.toastr.success('Category has been deleted successfully', 'Success !');  
    //       $('#refresh-btn').trigger('click'); 

    //     }else{
    //         this.toastr.error('Category deleting failed. Please try again', 'Error !'); 
    //     }
          
    //   });
	   
	}

}
