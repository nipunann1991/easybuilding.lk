import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from '../../../../admin/api/settings.service';
import * as $ from 'jquery'; 
import { AuthService as Auth } from '../../../auth/auth.service';
 
declare const bootbox:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})

	dtElement: DataTableDirective;
	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;
  roleData: any; 
  isEditableRoute: boolean = false;
  param: any = {};

  constructor(
    private settings: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authservice: Auth,
  ) { }

  ngOnInit(): void {

    this.getUserRole();

    this.formGroup = new FormGroup({ 
      user_email: new FormControl('', [
        Validators.required, 
      ]),
      role_id: new FormControl('', [
        Validators.required, 
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ]), 
    }); 

      

    this.route.paramMap.subscribe(params => {
      this.param = params;

      if (typeof this.param.params.id !== 'undefined' ) {
        this.isEditableRoute = true;;
        this.getSingleAdminUser();  
      }
         
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      autoWidth: false, 
      ajax: this.settings.getAdminUsersDT(), 
      columns: [ 
        { data: 'user_id' }, { data: 'user_email' },
      ],
      columnDefs: [ 
      {
        targets: 2,
        data: function( row ){    
          
          if(row.role_id == 1){
            return '<span class="badge badge-success">Active</span>';

          }else if(row.role_id == 2){
            return '<span class="badge badge-success">'+row.role_name+'</span>'; 
          }else if(row.role_id == 3){
            return '<span class="badge badge-warning">'+row.role_name+'</span>'; 
          }
         
        },
        
      },{
        targets: 3,
        data: function( row ){    
          return '<a class="edit-user-data" data-id="'+row.user_id+'" title="Edit"><i class="icon-pencil"></i></a> '+
          '<a class="delete-user-data" data-id="'+row.user_id+'" title="Edit"><i class="icon-bin"></i></a>'
           
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

    $('html').on('click', 'a.delete-user-data' , function(e1){ 
      e1.preventDefault(); 
      component1.openDeleteUserModal($(this).attr('data-id'));  
      
    })
    
    const component = this;

    $('html').on('click', 'a.edit-user-data' , function(e){ 
      e.preventDefault();
      component.editUser($(this).attr('data-id'));
      
    });
  }


  editUser(pageId){
		this.router.navigate(['admin/settings/users/'+pageId]); 
  }

  openDeleteUserModal(cat_id){ 
    const component = this;
    let dialog = bootbox.confirm({
      title: "Delete User",
      message: "Are you sure you need to delete this user?",
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
          component.deleteUser(cat_id);
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

  deleteUser(user_id){
  
    let param = { user_id: user_id };

    this.settings.deleteUser(param)
      .subscribe((response: any) => {

        if (response.status == 200) {
          this.toastr.success('City has been deleted successfully', 'Success !');  
          $('#refresh-btn').trigger('click'); 

        }else{
            this.toastr.error('City deleting failed. Please try again', 'Error !'); 
        }
          
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

  getUserRole(): void{
 
    this.settings.getUserRole()
        .subscribe((response: any) => {

          let data = [];

          if (response.status == 200) { 

            response.data.forEach( (value, index) => {  

                data.push({ 
                  id: value.role_id,
                  text: value.role_name
                });

                this.roleData = data;
            });

          }else{
              console.log(response)
          }
           
    }); 

  }

  clearForm(){
    this.formGroup.reset(); 
  }

  onAddAdminUser(){
    if (!this.formGroup.invalid) {

      this.formGroup.value.auth_token = this.authservice.generateRandomToken();
  
      this.settings.addAdminUser(this.formGroup.value)
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


  getSingleAdminUser(): void{
    let param = { user_id: this.param.params.id}
     
     this.settings.getSingleAdminUser(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
          
          console.log(response.data)
          let data = response.data[0];
          this.formGroup.setValue({
            role_id: data.role_id, 
            user_email: data.user_email,
            password: data.password
          });
 
         }else{
             console.log(response)
         }
            
     }); 

   }

   onUpdateAdminUser(){
    
    if (!this.formGroup.invalid) {
      //this.formGroup.value.user_email = this.authservice.generateRandomToken();

      let param = { 
        user_id: this.param.params.id,
        user_email: this.formGroup.value.user_email,
        role_id: this.formGroup.value.role_id
      }

      this.settings.editAdminUser(param)
        .subscribe((response: any) => {

          if (response.status == 200) {
            this.toastr.success('User has been edited successfully', 'Success !');  
            this.formGroup.reset();
            $('#refresh-btn').trigger('click');
            this.returnBack();

          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('User editing failed. Please try again', 'Error !'); 
          }
            
        });
    }
  }

  returnBack(): void{
		this.router.navigate(['admin/settings/users']);
	}

}
