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
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 5,  infinite: false,};

  constructor(
    private homePage: HomepageService,
    private globals: Globals
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);  
    this.getFeaturedProductsCategories();
  }

  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
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
