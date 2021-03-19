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
  selector: 'app-house-areas',
  templateUrl: './house-areas.component.html',
  styleUrls: ['./house-areas.component.css']
})
export class HouseAreasComponent implements OnInit {
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
      house_area: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
    }); 

    this.route.paramMap.subscribe(params => {
      this.param = params;

      if (typeof this.param.params.id !== 'undefined' ) {
        this.isEditableRoute = true;;
        this.getHouseAreas();  
      }
         
    });


    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false, 
        ajax: this.boq.getHouseAreasDT(), 
        columns: [ 
          { data: 'house_area_id' },{ data: 'house_area' }
        ],
        columnDefs: [{
        targets: 2,
        data: function( row ){   

          return '<a class="edit-boq-data" data-id="'+row.house_area_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
            '<a class="delete-boq-data" data-id="'+row.house_area_id+'" title="Edit"><i class="icon-bin"></i></a>'
            
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

		$('html').on('click', 'a.delete-boq-data' , function(e1){ 
      e1.stopImmediatePropagation();
			e1.preventDefault(); 
      component1.openDeleteModal($(this).attr('data-id'));  
			
			
    })
    
    const component = this;

		$('html').on('click', 'a.edit-boq-data' , function(e){ 
      e.stopImmediatePropagation();
			e.preventDefault();
      component.editHouseAreaPage($(this).attr('data-id'));  
			
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
  
  getHouseAreas(): void{
    let param = { house_area_id: this.param.params.id}
     
     this.boq.getSelectedHouseArea(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.houseArea = response.data[0]; 
          this.formGroup.setValue({house_area: this.houseArea.house_area}); 

         }else{
             console.log(response)
         }
            
     }); 

  }


  onSubmit() { 

    if (!this.formGroup.invalid) {

      this.boq.addHouseAreas(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('New house area has been added successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();

          }else{
              this.toastr.error('New house area adding failed. Please try again', 'Error !'); 
          }
           
        }); 
    } 
    
  }


  onUpdate(){
    if (!this.formGroup.invalid) {
      this.formGroup.value.house_area_id = this.param.params.id;
      this.boq.editHouseArea(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('House area  has been edited successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();
            this.returnBack();

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('House area editing failed. Please try again', 'Error !'); 
          }
            
        });
    }
  }


  editHouseAreaPage(pageId){ 
		this.router.navigate(['admin/boq/house-areas/'+pageId]); 
  } 


  returnBack(): void{
		this.router.navigate(['admin/boq/house-areas']);
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
         this.deleteHouseArea(id);
        }  
      
    }); 
    
  }


  deleteHouseArea(house_area_id){
 
    this.formGroup.value.house_area_id = house_area_id;
    
    this.boq.deleteHouseArea(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('House area has been deleted successfully', 'Success !');  
          this.rerender();

        }else{
            this.toastr.error('House area deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	} 

}
