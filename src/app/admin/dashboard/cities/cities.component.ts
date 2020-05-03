import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Options } from 'select2';
import { Subject } from 'rxjs'
import { CitiesService } from '../../../admin/api/cities.service'; 
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})

	dtElement: DataTableDirective;
	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  select2Options: Options;
  formGroup: FormGroup;
  districtsData: any;
  isEditableRoute: boolean = false;
  param: any = {};
  cityData: any = [];

  constructor(
    private cities: CitiesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.getDistricts();

    this.formGroup = new FormGroup({ 
      district_id: new FormControl('', [
        Validators.required, 
      ]),

      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
    }); 

    this.route.paramMap.subscribe(params => {
      this.param = params;

      if (typeof this.param.params.id !== 'undefined' ) {
        this.isEditableRoute = true;;
        this.getSelectedCity();  
      }
         
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      autoWidth: false, 
      ajax: this.cities.getCitiesDT(), 
      columns: [ 
        { data: 'city_id' },{ data: 'district_name' },{ data: 'city' }
      ],
      columnDefs: [{
      targets: 3,
      data: function( row ){   

        return '<a class="edit-city-data" data-id="'+row.city_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
          '<a class="delete-city-data" data-id="'+row.city_id+'" title="Edit"><i class="icon-bin"></i></a>'
          
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

    $('html').on('click', 'a.delete-city-data' , function(e1){ 
      e1.preventDefault(); 
      component1.openDeleteCityModal($(this).attr('data-id'));  
      
    })
    
    const component = this;

    $('html').on('click', 'a.edit-city-data' , function(e){ 
      e.preventDefault();
      component.editCityPage($(this).attr('data-id'));
      
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
        this.dtTrigger.next();
      });
  }

  editCityPage(pageId){
		this.router.navigate(['admin/cities/'+pageId]); 
  }
  
  
  onSubmit() { 

    if (!this.formGroup.invalid) {
  
      this.cities.addCity(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('New city has been added successfully', 'Success !');  
            this.formGroup.reset();
            $('#refresh-btn').trigger('click');
 
          }else{
              this.toastr.error('New city adding failed. Please try again', 'Error !'); 
          }
           
        }); 

    } 
    
  }

  onUpdate(){
    if (!this.formGroup.invalid) {
      this.formGroup.value.city_id = this.param.params.id;

      this.cities.editCity(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('City has been edited successfully', 'Success !');  
            this.formGroup.reset();
            $('#refresh-btn').trigger('click');
            this.returnBack();

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('City editing failed. Please try again', 'Error !'); 
          }
            
        });
    }
  }

  returnBack(): void{
		this.router.navigate(['admin/cities']);
	}

  getSelectedCity(): void{
    let param = { city_id: this.param.params.id}
     
     this.cities.getSelectedCity(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
          this.cityData = response.data[0];
          this.formGroup.setValue({district_id: this.cityData.district_id, city: this.cityData.city});
          //this.getSelectedParentCategory = parseInt(response.data[0].parent_cat_id); 

         }else{
             console.log(response)
         }
            
     }); 

   }

  openDeleteCityModal(cat_id){ 
    const component = this;
    let dialog = bootbox.confirm({
      title: "Delete City",
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
          component.deleteCity(cat_id);
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

  deleteCity(city_id){
 
    this.formGroup.value.city_id = city_id;
    
    this.cities.deleteCity(this.formGroup.value)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('City has been deleted successfully', 'Success !');  
          $('#refresh-btn').trigger('click'); 

        }else{
            this.toastr.error('City deleting failed. Please try again', 'Error !'); 
        }
          
      });
	   
	}

  clearForm(){
    this.formGroup.reset();
  }

  getDistricts(): void{
 
    this.cities.getDistricts()
        .subscribe((response: any) => {

          let data = [];

          if (response.status == 200) { 

            response.data.forEach( (value, index) => {  

                data.push({ 
                  id: value.district_id,
                  text: value.district_name
                });

                this.districtsData = data;
            });

          }else{
              console.log(response)
          }
           
    }); 

  }

}


