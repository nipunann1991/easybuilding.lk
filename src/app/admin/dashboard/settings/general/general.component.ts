import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../services/settings.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  formGroup: FormGroup;
  public Editor = ClassicEditor;
  isDataNull: boolean;
  companyId: any;

  constructor(
    private settings: SettingsService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getSelectedMainCategory();

    this.formGroup = new FormGroup({ 
      company_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      company_start_date: new FormControl(''),

      company_desc: new FormControl('', [
        Validators.required,
        Validators.minLength(2), 
      ]),
      company_address: new FormControl('', [
        Validators.required, 
      ]),
      company_tel1: new FormControl('', [
        Validators.required, 
      ]),
      company_tel2: new FormControl(''),

      company_email: new FormControl('', [
        Validators.required, 
      ]),

      fb_url: new FormControl(''),
      twitter_url: new FormControl(''),
      youtube_url: new FormControl(''),
      linkedin_url: new FormControl(''),
      
    }); 
  }

  getSelectedMainCategory(): void{ 
     
     this.settings.getCompanyDetails()
         .subscribe((response: any) => {

        if (response.status == 200) {  
        
          if(response.data.length == 0){
            this.isDataNull  = true;
          }else{
            this.isDataNull = false; 
            let companyData = response.data[0];
            this.companyId = companyData.company_id;

            this.formGroup.setValue({
              company_name: companyData.company_name,
              company_start_date: companyData.company_start_date,  
              company_desc: companyData.company_desc,
              company_address: companyData.company_address,
              company_tel1: companyData.company_tel1,
              company_tel2: companyData.company_tel2, 
              company_email: companyData.company_email, 
              fb_url: companyData.fb_url,
              twitter_url: companyData.twitter_url,
              youtube_url: companyData.youtube_url,
              linkedin_url: companyData.linkedin_url,
            })

          }
          
           

         }else{
             console.log(response)
         }
            
     }); 

  }

  onSave(){

    if (!this.formGroup.invalid) {

      if(this.isDataNull){
        this.settings.addCompanyDetails(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('Company details has been added successfully', 'Success !');  
            this.getSelectedMainCategory();

          }else{
              this.toastr.error('Company details adding failed. Please try again', 'Error !'); 
          }
           
        });
      }else{
        this.formGroup.value.company_id = this.companyId;
        this.settings.editCompanyDetails(this.formGroup.value)
        .subscribe((response: any) => {
          if (response.status == 200) {
            this.toastr.success('Company details has been edited successfully', 'Success !');   
            this.getSelectedMainCategory();
            
          }else{
              this.toastr.error('Company details editing failed. Please try again', 'Error !'); 
          }
           
        });
      }

       
    }

  }

}
