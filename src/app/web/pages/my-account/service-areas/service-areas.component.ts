import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute,  NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { Options } from 'select2';

@Component({
  selector: 'app-service-areas',
  templateUrl: './service-areas.component.html',
  styleUrls: ['./service-areas.component.css']
})
export class ServiceAreasComponent implements OnInit {

  isStepsForm: boolean = false;
  formGroup: FormGroup;
  public options: Options;

  serviceAreas: any = [
     
  ];

  constructor(
    private myaccount: MyAccountService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({ 
      
      prof_category: new FormControl('', [
        Validators.required
      ]), 
     
      email: new FormControl({value:'', disabled: true}, [ 
          Validators.required, 
      ]), 

    });

    this.options = {
      multiple: true, 
      closeOnSelect: true, 
    };

    if(this.router.url.includes("steps")){
      this.isStepsForm = true;
    }

    this.getCities();

  }

  getCities(){

    this.myaccount.getCities() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.serviceAreas = response.data;
 
          // this.formGroup.setValue({
          //     first_name: this.profile.first_name, 
          //     last_name: this.profile.last_name, 
          //     display_name: this.profile.display_name,
          //     prof_category: this.profile.prof_category,
          //     br_no: this.profile.br_no,
          //     description: this.profile.description,
          //     email: this.profile.email,
              
          // });

          // this.clientId = this.profile.client_id
  
        }else{
            
        }
          
      });
  }



  onSave(){

    if (!this.formGroup.invalid) {

      console.log(this.formGroup.value);
      
       
    }

  }

}
