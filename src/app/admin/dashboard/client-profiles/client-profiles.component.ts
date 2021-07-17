import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs'
import { RouterModule, ActivatedRoute, Routes, Router} from '@angular/router';
import { ClientsService } from './services/clients.service'; 

@Component({
  selector: 'app-client-profiles',
  templateUrl: './client-profiles.component.html',
  styleUrls: ['./client-profiles.component.css']
})
export class ClientProfilesComponent implements OnInit {

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
      ajax: this.clients.getClientProfileDetailsDT(), 
      columns: [ 
        { data: 'company_id' }, 
        { data: 'display_name' }, 
        { data: 'client_id' }, 
        { data: 'email' }, 
        { data: 'tel1' }, 
        { data: 'br_no' }, 
        { data: 'city' }, 
      ],
      columnDefs: [
      {
        targets: 7,
        data: function( row ){   

          return  '<a class="view-client-data" data-id="' + row.client_id + '" data-provider-id="' + row.provider_id + '/about" title="View">View</i></a> ';
            
        }, 
      }
    ],
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

    // $('html').on('click', 'a.delete-maincategory-data' , function(e1){ 
    //   e1.preventDefault(); 
    //   component1.openDeleteCustomerModal($(this).attr('data-id'));  
      
    // })
    

    $('html').on('click', 'a.view-client-data' , function(e1){ 
      e1.preventDefault(); 
      component1.viewClent($(this).attr('data-id'), $(this).attr('data-provider-id'));  
      
    })

    
    // const component = this;

    // $('html').on('click', 'a.edit-maincategory-data' , function(e){ 
    //   e.preventDefault();
    //   component.editCategoryPage($(this).attr('data-id'));
      
    // });
  }

  viewClent(id, provider_id){
    this.router.navigate(['admin/users/user/'+id+'/'+provider_id]); 
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




}
