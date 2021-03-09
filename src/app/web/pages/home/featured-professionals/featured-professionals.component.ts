import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomepageService } from "../../../../admin/api/frontend/homepage.service";
import { environment } from "../../../../../environments/environment";
import { Globals } from "../../../../app.global";

@Component({
  selector: 'app-featured-professionals',
  templateUrl: './featured-professionals.component.html',
  styleUrls: ['./featured-professionals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeaturedProfessionalsComponent implements OnInit {

  featuredProfList: any = [];
  
  constructor(
    private homePage: HomepageService,
    private globals: Globals
  ) { }

  ngOnInit(): void {
    this.getFeaturedProfessionals();
  }

  getFeaturedProfessionals(){ 
      
    this.homePage.getConstructors() 
      .subscribe((response: any) => {

        response.data.forEach(elm => {
         
          let profileImg = environment.uploadPath + elm.client_id +'/'+ elm.company_id +'/';

          (elm.profie_image == '')?  profileImg = ''  : profileImg = profileImg + elm.profie_image  ;

          let constructors = {
            id: elm.client_id,
            title: elm.display_name, 
            description: elm.description,
            profileLink: '/user/'+ elm.client_id +'/'+ elm.provider_id +'/about', 
            imgUrl: profileImg,
            rating:  elm.rating,
            total_reviews : elm.total_reviews,
            contact: {
              city : elm.city, 
              tel : elm.tel1, 
            }
          }

          this.featuredProfList.push(constructors)

         
        });
 
          
      }); 
  
  }

}
