import { Component, OnInit, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageService } from "../services/homepage.service";
import { environment } from "../../../../../environments/environment";
import { Globals } from "../../../../app.global";
import { HostListener } from "@angular/core";
import { SlickCarouselComponent } from "ngx-slick-carousel";

@Component({
  selector: 'app-ideas-category',
  templateUrl: './ideas-category.component.html',
  styleUrls: ['./ideas-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IdeasCategoryComponent implements OnInit {

  @Input() setCategoryData: any = {};
  @ViewChild("slickModal") slickModal: SlickCarouselComponent;

  bgImageCatPath = environment.uploadPath + "admin/category/thumb/";
  featuredProductsCategories: any = [];
  queryParams =  { id: 0, results: '10',  index: '1'};
  isAdminData: boolean = false; 

  slideConfig = {}

  constructor(
    private homePage: HomepageService,
    private router: Router,
    private globals: Globals,
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);  
    this.getFeaturedProductsCategories();

    if(this.setCategoryData.isAdmin){
      
      this.slideConfig = {
        slidesToShow: 4, 
        slidesToScroll: 4,  
        infinite: true,
        autoplay: true,
        autoplaySpeed: 7000,
        speed: 1000,
      }

    }else{
      this.slideConfig = {
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
      }
    }

    
    
  }

  slickInit(e) {
    
  }
  
  breakpoint(e) {
    
  }
  
  afterChange(e) {

  }
  
  beforeChange(e) {

  }

  ngOnChanges() {    
    this.ngOnInit();
    this.isAdminData = this.setCategoryData.isAdmin;  
  }   

  getFeaturedProductsCategories(){
    this.featuredProductsCategories = [];

    this.homePage.getFeaturedProductsCategories() 
      .subscribe({
        next: (response: any) => { 

          if (response.status == 200) {   
            this.featuredProductsCategories = response.data;
            this.featuredProductsCategories.map(x=> x.url = "/photos/"+this.generateSlug(x.cat_lvl2_name) );
          }else{
              
          }
    
        },

        error: err =>{
          console.log(err)
        }
      }); 
  } 

  generateSlug(text){
    return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
  }

  gotoURL(url){
    this.queryParams.id = url.cat_lvl2_id; 
    this.router.navigate([url.url], { queryParams: this.queryParams });
  }
}
