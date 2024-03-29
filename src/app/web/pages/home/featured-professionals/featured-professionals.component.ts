import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomepageService } from "../services/homepage.service";
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
  starRating:any = Array.from(Array(this.globals.starRating), (_, index) => index + 1);
  slideConfig = {
    slidesToShow: 4, 
    slidesToScroll: 4,  
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3, 
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2, 
        }
      }, 
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, 
        }
      },
    ]
  };
  
  constructor(
    private homePage: HomepageService,
    private globals: Globals
  ) { }

  ngOnInit(): void {
    this.getFeaturedProfessionals();
  }


  slickInit(e) {
    
  }
  
  breakpoint(e) {
    
  }
  
  afterChange(e) {
    
  }
  
  beforeChange(e) {
    
  }

  getFeaturedProfessionals(){ 
      
    this.homePage.getConstructors() 
      .subscribe({
        next: (response: any) => {

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
    
        },

        error: err =>{

        }
      }); 
  
  }

}
