import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { environment } from "../../../../../environments/environment";
import { DataTableDirective } from 'angular-datatables';
import { Options } from 'select2';
import { Subject } from 'rxjs'
import { BoqService } from "../services/boq.service";
import { Globals } from "../../../../app.global";
import { FileSaverService, } from 'ngx-filesaver'; 
import { ModalManager } from 'ngb-modal';
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-house-surface-types',
  templateUrl: './house-surface-types.component.html',
  styleUrls: ['./house-surface-types.component.css']
})
export class HouseSurfaceTypesComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective; 


	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  select2Options: Options;
  formGroup: FormGroup;
  isEditableRoute: boolean = false;
  param: any = {};
  surfaceCategory: any = [];
  houseArea: any = []
  level: any = [1,2]


  constructor( 
    private boq: BoqService,
    private modalService: ModalManager,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
    private globals: Globals,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.getHouseSurfaces();

    this.formGroup = new FormGroup({ 
      house_surfaces_type: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),

      surface_type_id: new FormControl('', [ 
          Validators.required, 
      ]),
      
      level: new FormControl('', [ 
          Validators.required, 
      ]),
      
      value: new FormControl('', [ 
        Validators.required, 
      ]),

    }); 

    this.route.queryParams.subscribe(params => {
      this.param = params;

      if (Object.keys(this.param).length  !== 0 ) {
        this.isEditableRoute = true;;
        this.getSelectedHouseSurfaceType();  
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
        ajax: this.boq.getHouseSurfaceTypeDT(), 
        columns: [ 
          { data: 'house_surfaces_type_id' }, { data: 'level' },{ data: 'surface_type' },{ data: 'house_surfaces_type' }, {data: 'value'}
        ],
        columnDefs: [{
        targets: 5,
        data: function( row ){   
          
          if(!that.globals.isManagerLogin()){
            return '<a class="edit-boq-st-data" data-id="'+row.house_surfaces_type_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
            '<a class="delete-boq-st-data" data-id="'+row.house_surfaces_type_id+'" title="Delete"><i class="icon-bin"></i></a>'
          }else{
            return '<a class="edit-boq-st-data" data-id="'+row.house_surfaces_type_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
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

		$('html').on('click', 'a.delete-boq-st-data' , function(e1){ 
      e1.stopImmediatePropagation();
			e1.preventDefault(); 
      component1.openDeleteModal($(this).attr('data-id'));  
			
			
    })
    
    const component = this;

		$('html').on('click', 'a.edit-boq-st-data' , function(e){ 
      e.stopImmediatePropagation();
			e.preventDefault();
      component.editHouseSurfacesPage($(this).attr('data-id'));  
			
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


  getHouseSurfaces(): void{
 
    this.boq.getHouseSurfaces()
        .subscribe((response: any) => {

          let data = [];

          if (response.status == 200) {  

            response.data.forEach( (value, index) => {  

                data.push({ 
                  id: value.surface_type_id,
                  text: value.surface_type
                });

                this.surfaceCategory = data;
            });

          }else{
              console.log(response)
          }
           
    }); 

  }


  onSubmit() { 

    if (!this.formGroup.invalid) {

      this.boq.addHouseSurfaceType(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('New house surface type has been added successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();

          }else{
              this.toastr.error('New house surface type adding failed. Please try again', 'Error !'); 
          }
           
        }); 
    } 
    
  }


  onUpdate(){
    if (!this.formGroup.invalid) {
      this.formGroup.value.house_surfaces_type_id = this.param.id;
      this.boq.editHouseSurfaceType(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('House surface type has been edited successfully', 'Success !');  
            this.formGroup.reset();
            this.rerender();
            this.returnBack();

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('House surface type editing failed. Please try again', 'Error !'); 
          }
            
        });
    }
  }

  
  editHouseSurfacesPage(pageId){  
    this.router.navigate(['admin/boq/house-surface-types/'], { queryParams:  {id: pageId} });
  } 


  returnBack(): void{
		this.router.navigate(['admin/boq/house-surface-types']);
	}


  openDeleteModal(id){ 

    const dialogRef = this.globals.confirmDialogBox({ 
      title: "Delete House Surface Type", 
      message: "Are you sure you need to delete this?", 
      isDelete: true,
      confirmBtn: "Yes, Delete",
      cancelBtn: 'No'
    });
     
    dialogRef.afterClosed().subscribe(result => {
         
        if(result){
         this.deleteHouseSurfaceType(id);
         this.rerender();
        }  
      
    }); 
    
  }


  deleteHouseSurfaceType(house_surfaces_type_id){
 
    this.formGroup.value.house_surfaces_type_id = house_surfaces_type_id;
    
    this.boq.deleteHouseSurfaceType(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('House surface has been deleted successfully', 'Success !');  

        }else{
            this.toastr.error('House surface deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	} 


  getSelectedHouseSurfaceType(): void{
    let param = { house_surfaces_type_id: this.param.id}
     
     this.boq.getSelectedHouseSurfaceType(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.houseArea = response.data[0]; 
      
          this.formGroup.setValue({ 
            house_surfaces_type: this.houseArea.house_surfaces_type,
            level: this.houseArea.level,
            surface_type_id: this.houseArea.surface_type_id,
            value: this.houseArea.value  
          }); 

         }else{
             console.log(response)
         }
            
     }); 

  }

}
