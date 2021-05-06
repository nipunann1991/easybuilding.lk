import { Component, OnInit } from '@angular/core';
import { HomepageService } from "../../../../admin/api/frontend/homepage.service";
import { environment } from "../../../../../environments/environment";
import { Globals } from "../../../../app.global";

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {
  featuredProdList: any = []; 
  
  constructor(
    private homePage: HomepageService,
    private globals: Globals
  ) { }

  ngOnInit(): void {
    this.getFeaturedProducts();
  }


  getFeaturedProducts(){

    this.homePage.getFeaturedProducts() 
      .subscribe((response: any) => {
 
        if (response.status == 200) {   

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
  
      }); 
  }

}
