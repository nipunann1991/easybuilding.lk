import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'
import { RouterModule, ActivatedRoute, Routes, Router, NavigationEnd} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from '../client-profiles/services/clients.service'; 
import * as $ from 'jquery';
declare const bootbox:any;

@Component({
  selector: 'app-clients',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})

	dtElement: DataTableDirective;
	dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  profileType: any = -1;
  profileViewOptions:any =[
    {id: 0, label: "All Profiles", checked: true, value: -1},
    {id: 1, label: "Business Profiles", checked: false, value: 1},
    {id: 2, label: "Personal Profiles", checked: false, value: 0},
    {id: 3, label: "Created by Admin", checked: false, value: 2},
  ]

  constructor(
    private clients: ClientsService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public cdr: ChangeDetectorRef
  ) { 
 

  }

  ngOnInit(): void {
 
    this.tableOptions();

    const component1 = this;
  
    
    $('html').on('click', 'a.view-client-data' , function(e1){ 
      e1.preventDefault(); 
      component1.viewClent($(this).attr('data-id'), $(this).attr('data-provider-id'));  
      
    })
      
  }


  tableOptions(){ 

    this.dtOptions = { 
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        autoWidth: false,  
        bStateSave: true,
        ajax: this.clients.getClientDetailsDT(this.profileType), 
        
        columns: [ 
          { data: 'client_id' }
        ],
        columnDefs: [
        {
          targets: 1,
          data: function( row ){    

            if((row.first_name+" "+ row.last_name) ==  row.display_name ){
              return  '<a class="view-client-data" data-id="' + row.client_id + '" data-provider-id="' + row.provider_id + '/about" title="View">-</i></a> ';
            }else{
              return  '<a class="view-client-data" data-id="' + row.client_id + '" data-provider-id="' + row.provider_id + '/about" title="View">' +   row.display_name  + '</i></a> ';
            }
           
          },
          
        },
        {
          targets: 2,
          data: function( row ){    
            let verified = "";

            if(row.verified_email == 1){
              verified = `<span class="badge badge-success">V</span>`;
            }

            return row.email +" "+ verified;
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
            return row.first_name+" "+ row.last_name
          },
          
        },{
          targets: 5,
          data: function( row ){    
            return row.created_date;
          },
          
        },{
          targets: 6,
          data: function( row ){  
            
            let featured = ""
            
            if(row.company_status == 0){
              return '<span class="badge badge-danger">Blocked</span>';

            }else if(row.company_status == 1){ 
              
              console.log(row.company_profile, row.steps)
              
              if(row.featured == 1){
                featured = '<span class="badge badge-warning">F</span>';
              }

              if((row.company_profile == 1 && row.steps == 4) || (row.company_profile == 0 && row.steps == 2)){
                return '<span class="badge badge-success">Active</span> ' + featured;
              }else{
                return '<span class="badge badge-warning">Incomplete</span> ' + featured; 
              }
 
            }else if(row.company_status == 2){
              return '<span class="badge badge-success">Active - A</span>';

            }
          
          },
          
        },{
          targets: 7,
          data: function( row ){   

            if(row.first_name == "Admin"){
                return '<a class="view-client-data" data-id="' + row.client_id + '" data-provider-id="' + row.provider_id + '/about" title="View"><i class="icon-view"></i> View</a> ';
            }else{
              return '<a class="view-client-data" data-id="' + row.client_id + '" data-provider-id="' + row.provider_id + '/about" title="View"><i class="icon-view"></i> View</a> ';
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
  }


  viewClent(id, provider_id){
    this.router.navigate(['admin/users/user/'+id+'/'+provider_id]); 
  }

  
  editClent(id, provider_id){

     let param = { client_id: id, provider_id: provider_id}
     
     this.clients.getProfileToken(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 

          let tokenUser = { 
            auth_token: response.data[0].auth_token,
            email: response.data[0].email,
            provider_id: response.data[0].provider_id,
            session_id: response.data[0].client_id 
          }
 
          localStorage.removeItem("tokenUser");
          localStorage.setItem("tokenUser",  JSON.stringify(tokenUser));
          this.router.navigate(['admin/users/create-profile/steps/account-info']); 

         }else{
             console.log(response)
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
        this.tableOptions(); 
        dtInstance.destroy();
        // Call the dtTrigger to rerender again  
        this.dtTrigger.next();
      });
  }

  editCategoryPage(pageId){
	 
  }  

  returnBack(): void{
		 
	}

  getSelectedMainCategory(): void{ 

   }

  
  onChange(event){ 
    this.profileType = event.value;  
    this.tableOptions();
    this.cdr.detectChanges();
    this.rerender();

  }



}
