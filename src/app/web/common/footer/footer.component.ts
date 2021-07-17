import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../pages/contact/services/contact.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  companyData: any = {}

  constructor(
    private contact: ContactService
  ) { }

  ngOnInit(): void {
    this.getCompanyData();
  }

  getCompanyData(){
    this.contact.getCompanyData()
      .subscribe((response: any) => {

          if (response.status == 200) { 
            this.companyData = response.data[0]; 
            this.companyData.company_address = this.companyData.company_address.replace(/\n/ig, '<br/>');

          }else if (response.status == 401){
             
          }else{
             
          } 

    });
  }

}
