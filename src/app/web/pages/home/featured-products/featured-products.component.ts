import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { HomepageService } from "../services/homepage.service";
import { environment } from "../../../../../environments/environment";
import { Globals } from "../../../../app.global";

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeaturedProductsComponent implements OnInit {
  featuredProdList: any = []; 
  isContentLoaded: boolean = false;

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
    this.getFeaturedProducts();
  }
 
  slickInit(e) {
    
  }
  
  breakpoint(e) {
     
  }
  
  afterChange(e) {
  
  }
  
  beforeChange(e) {
    
  }

  getFeaturedProducts(){

    this.homePage.getFeaturedProducts() 
      .subscribe({
        next: (response: any) => {
 
          if (response.status == 200) {   
            
            this.isContentLoaded = true
            response.data.forEach(elm => {
           
              let profileImg = environment.uploadPath + elm.client_id +'/'+ elm.company_id +'/';
    
              (elm.primary_img == '')?  profileImg = ''  : profileImg = profileImg + "products/thumb/" + elm.primary_img  ;
    
              let featuredProducts = {
                id: elm.client_id,
                product_name: elm.product_name, 
                product_desc: elm.product_desc,
                profileLink: '/user/'+ elm.client_id +'/'+ elm.provider_id +'/products', 
                imgUrl: profileImg, 
                display_name: elm.display_name,
                price: elm.product_price,
                currency: this.globals.currencyAlias,
                unit: this.globals.unitList[elm.product_unit - 1].text
              }
    
              this.featuredProdList.push(featuredProducts); 
             
            }); 
    
          }else{
              
          }
    
        },

        error: (err) =>{ console.log(err) }
      }); 
  }

}
