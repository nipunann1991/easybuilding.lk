import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomepageService } from "../../../../admin/api/frontend/homepage.service";
import { environment } from "../../../../../environments/environment";
import { Globals } from "../../../../app.global";

@Component({
  selector: 'app-ideas-category',
  templateUrl: './ideas-category.component.html',
  styleUrls: ['./ideas-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IdeasCategoryComponent implements OnInit {

  bgImageCatPath = environment.uploadPath + "admin/category/thumb/";
  featuredProductsCategories: any = [];
  queryParams =  { results: '10',  index: '1'}; 
  slideConfig = {
    slidesToShow: 5, 
    slidesToScroll: 5,  
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4, 
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3, 
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2, 
        }
      }, 
    ]
  };

  constructor(
    private homePage: HomepageService,
    private globals: Globals
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);  
    this.getFeaturedProductsCategories();
  }

  slickInit(e) {
    
  }
  
  breakpoint(e) {
    
  }
  
  afterChange(e) {

  }
  
  beforeChange(e) {

  }

  getFeaturedProductsCategories(){

    this.homePage.getFeaturedProductsCategories() 
      .subscribe((response: any) => {
 
        if (response.status == 200) {   
          this.featuredProductsCategories = response.data;

        }else{
            
        }
  
      }); 
  }

}
