import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Globals } from "../../../../app.global";
import { Subject } from 'rxjs'
import { BoqService } from "../../../api/boq.service";
import * as $ from 'jquery';


@Component({
  selector: 'app-house-surfaces',
  templateUrl: './house-surfaces.component.html',
  styleUrls: ['./house-surfaces.component.css']
})
export class HouseSurfacesComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})

	dtElement: DataTableDirective;
	dtOptions: any = {};
	dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;
  isEditableRoute: boolean = false;
  param: any = {};
  houseArea: any = [];

  constructor(
    private boq: BoqService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private globals: Globals,
  ) { }

  ngOnInit(): void {
      
    this.formGroup = new FormGroup({ 
      surface_type: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
    }); 

    this.route.paramMap.subscribe(params => {
      this.param = params;

      if (typeof this.param.params.id !== 'undefined' ) {
        this.isEditableRoute = true;;
        this.getHouseSurface();  
      }
         
    });


    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false, 
        ajax: this.boq.getHouseSurfaceDT(), 
        columns: [ 
          { data: 'surface_type_id' },{ data: 'surface_type' }
        ],
        columnDefs: [{
        targets: 2,
        data: function( row ){   

          return '<a class="edit-boq-sf-data" data-id="'+row.surface_type_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
            '<a class="delete-boq-sf-data" data-id="'+row.surface_type_id+'" title="Edit"><i class="icon-bin"></i></a>'
            
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

		$('html').on('click', 'a.delete-boq-sf-data' , function(e1){ 
      e1.stopImmediatePropagation();
			e1.preventDefault(); 
      component1.openDeleteModal($(this).attr('data-id'));  
			
			
    })
    
    const component = this;

		$('html').on('click', 'a.edit-boq-sf-data' , function(e){ 
      e.stopImmediatePropagation();
			e.preventDefault();
      component.editHouseSurfacePage($(this).attr('data-id'));  
			
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
  
  getHouseSurface(): void{
    let param = { surface_type_id: this.param.params.id}
     
     this.boq.getSelectedHouseSurface(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.houseArea = response.data[0]; 
          this.formGroup.setValue({surface_type: this.houseArea.surface_type}); 

         }else{
             console.log(response)
         }
            
     }); 

  }


  onSubmit() { 

    if (!this.formGroup.invalid) {

      this.boq.addHouseSurface(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('New house surface has been added successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();

          }else{
              this.toastr.error('New house surface adding failed. Please try again', 'Error !'); 
          }
           
        }); 
    } 
    
  }


  onUpdate(){
    if (!this.formGroup.invalid) {
      this.formGroup.value.surface_type_id = this.param.params.id;
      this.boq.editHouseSurface(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('House surface  has been edited successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();
            this.returnBack();

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('House surface editing failed. Please try again', 'Error !'); 
          }
            
        });
    }
  }


  editHouseSurfacePage(pageId){ 
		this.router.navigate(['admin/boq/house-surfaces/'+pageId]); 
  } 


  returnBack(): void{
		this.router.navigate(['admin/boq/house-surfaces']);
	}


  openDeleteModal(id){ 

    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete House Area", 
      message: "Are you sure you need to delete this?", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
        if(result){
         this.deleteHouseSurface(id);
        }  
      
    }); 
    
  }


  deleteHouseSurface(surface_type_id){
 
    this.formGroup.value.surface_type_id = surface_type_id;
    
    this.boq.deleteHouseSurface(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('House surface has been deleted successfully', 'Success !');  
          this.rerender();

        }else{
            this.toastr.error('House surface deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	} 

}
