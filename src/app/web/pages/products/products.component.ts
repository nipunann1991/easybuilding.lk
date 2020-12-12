import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { SearchService } from "../../../admin/api/frontend/search.service";
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Options } from 'select2'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnInit {

  pageData: any = {};
  sortByFilter: any = [];
  sortByRating: any = [];
  sortByCategory: any = [];
  sortByLocation: any = [];
  allServices: any = [];
  products: any = [];
  isGridView: boolean = true;
  public options: Options;

  constructor(
    private search: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 

  

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) { 
        window.scroll(0,0);  
        this.products = [];
        this.getSelectedProductData();
        this.searchProducts();
      }
      
    })
  }
 
  ngOnInit(): void { 
 
    this.options = {
      multiple: true, 
      closeOnSelect: true, 
      tags: true 
    };

    this.sortByFilter = [
      { id: 1, option: "Most Recent", alias: "most_recent", isChecked: true },
      { id: 2, option: "Highest Ratings", alias: "hightest_ratings", isChecked: false },
      { id: 3, option: "Most Reviewed", alias: "most_reviewed", isChecked: false },
    ];

    this.sortByRating = [
      { id: 1, option: "All Ratings", alias: "allstar", isChecked: true },
      { id: 2, option: "5 Star Ratings", alias: "5star", isChecked: false },
      { id: 3, option: "4 Star Ratings", alias: "4star", isChecked: false },
    ];

    this.sortByCategory = [
      { id: 1, option: "Level 1", alias: "lvl1", isChecked: true },
      { id: 2, option: "Level 2", alias: "lvl12", isChecked: false }, 
    ];
 
    this.sortByLocation = [
      { id: 1, option: "Any Location", alias: "any", isChecked: true },
      { id: 2, option: "All Island", alias: "all", isChecked: false }, 
      { id: 3, option: "By District", alias: "district", isChecked: false }, 
      { id: 4, option: "By City", alias: "city", isChecked: false }, 
    ];
 
    this.getGridView();

  }

  getSelectedProductData(){
    let params = { cat_lvl2_id: this.activatedRoute.snapshot.params.id }; 

    this.search.getSelectedProductData(params) 
    .subscribe((response: any) => {

      if (response.status == 200) {

        let page = response.data[0]

        this.pageData = {
          parentCategory: page.cat_name,
          categoryLevel1: page.cat_lvl1_name,
          categoryLevel2: page.cat_lvl2_name
        } 
 
      }
      
    });

    
  }


  searchProducts(){

    let params = { 
      cat_lvl2_id: this.activatedRoute.snapshot.params.id, 
      limit: this.activatedRoute.snapshot.queryParamMap.get('results'), 
      page_index: this.activatedRoute.snapshot.queryParamMap.get('index') 
    };   

    this.search.searchProducts(params) 
    .subscribe((response: any) => {

      if (response.status == 200) {

        this.pageData.start = response.start;
        this.pageData.end = response.end;
        this.pageData.total_results = response.total_results;

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

          this.products.push(constructors)
          
        }); 
 
      }
      
    });
  }

  getGridView(){ 
    let storageData = JSON.parse(localStorage.getItem('token')); 

    if(typeof storageData.isGridView !== 'undefined' ){
      this.isGridView = storageData.isGridView;
    }
     
  }

  setGridView(){ 
    let storageData = JSON.parse(localStorage.getItem('token')); 
    storageData.isGridView = this.isGridView; 
    localStorage.setItem('token', JSON.stringify(storageData) );   

  }

  
  gridView(){
    this.isGridView = true;
    this.setGridView();
  }


  listView(){
    this.isGridView = false;
    this.setGridView(); 
  }

}
