import { Component, OnInit } from '@angular/core';
import { AppSEO } from "./../../../app.seo";
import { HomepageService } from '../../../admin/api/frontend/homepage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  companyData: any = {}

  constructor(
    private seo: AppSEO,
    private home: HomepageService
    ) { 
    this.pageSEO();  
  }

  ngOnInit(): void { 
    window.scroll(0,0); 
    this.getCompanyData();
  }


  getCompanyData(){
    this.home.getCompanyData()
      .subscribe((response: any) => {

          if (response.status == 200) { 
            this.companyData = response.data[0]; 
            this.companyData.company_address = this.companyData.company_address.replace(/\n/ig, '<br/>');

            console.log(this.companyData)

          }else if (response.status == 401){
             
          }else{
             
          } 

    });
  }

  pageSEO() : void{
    let seoData = {
      title: 'EasyBuilding.lk | Contact Us',
      keywords: 'Construction Services in Colombo Galle Kalutara Gampaha Srilanka,Vehicle A/C Repairs, Electrician,Plumber Colmbo Srilanka,Tile Services, Construction Deals,Mason baas,House builders Srilanka,ManPower,WorkForce,Construction Services, Construction Rates, BOQ, Quotation Requests, Construction Deals,Easybuilding, Easybuilding.lk, Easybuilding Deals, Own Quotation Requests, House construction, Building construction, Contrcators, inteiror, plumbers, Painters,  architects, structural engineers, civil construction, repair',
      description: 'We are a leading online House and Building construction market place connecting potential house and commercial building construction clients with quality and reliable construction companies, individual contractors, masons, plumbers, electricians, and construction and interior material suppliers.',
      image: ''
    }

    this.seo.setSEOData(seoData)
  }

}
