import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from "../../../admin/api/frontend/search.service";
import { MyAccountService } from '../../../admin/api/frontend/my-account.service';
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
  serviceAreaCities: any = []; 
  serviceAreaDistricts: any = []; 
  isGridView: boolean = false;
  area: number = -1;
  searchParams = {
    sortBy: "",
    sortByServiceArea: ""
  }

  private prevParam: string = ""; 
  public options: Options;
  formGroup: FormGroup;

  constructor(
    private myaccount: MyAccountService,
    private search: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
 
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) { 
        window.scroll(0,0);   
       
        
        if(this.prevParam == "" || this.prevParam != this.activatedRoute.snapshot.params.id ){

          this.prevParam = this.activatedRoute.snapshot.params.id;
          this.getSelectedProductData();  
          this.filterOptions();
          this.initialSort(0)
        }
        
        
      }
      
    })
  }
 
  ngOnInit(): void { 
  
    this.formGroup = new FormGroup({   

      services: new FormControl("", [
        Validators.required
      ]),  
      
    });

    this.options = {
      multiple: false, 
      closeOnSelect: true, 
      tags: true 
    };
 
    this.getGridView();
    this.getDistricts();
    this.getCities();
     
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

  getCities(){ 

    this.myaccount.getCities() 
      .subscribe((response: any) => {
        if (response.status == 200) {  
          this.serviceAreaCities = response.data; 
           
        }else{
            
        }
          
      });
  }


  getDistricts(){ 

    this.myaccount.getDistricts() 
      .subscribe((response: any) => {
        if (response.status == 200) {
 
          this.serviceAreaDistricts = response.data;  
  
        }else{
            
        }
          
      });
  }

  filterOptions(){

    this.sortByFilter = [
      { id: 1, option: "Highest Ratings", alias: "hightest_ratings", isChecked: false },
      { id: 2, option: "Most Recent", alias: "most_recent", isChecked: false }, 
      { id: 3, option: "Most Reviewed", alias: "most_reviewed", isChecked: false },
    ];

    this.sortByRating = [
      { id: 1, option: "All Ratings", alias: "allstar", isChecked: false },
      { id: 2, option: "5 Star Ratings", alias: "5star", isChecked: false },
      { id: 3, option: "4 Star Ratings", alias: "4star", isChecked: false },
    ];

    this.sortByCategory = [
      { id: 1, option: "Level 1", alias: "lvl1", isChecked: false },
      { id: 2, option: "Level 2", alias: "lvl12", isChecked: false }, 
    ];
 
    this.sortByLocation = [
      { id: 1, option: "Any", alias: "any", isChecked: false },
      { id: 2, option: "All Island", alias: "all", isChecked: false }, 
      { id: 3, option: "By District", alias: "district", isChecked: false }, 
      { id: 4, option: "By City", alias: "city", isChecked: false }, 
    ];
 
  }


  searchProducts(queryParams){

    this.products = []; 

    let params = { 
      cat_lvl2_id: this.activatedRoute.snapshot.params.id, 
      limit: queryParams.results, 
      page_index: queryParams.index,
      sort_by: queryParams.sort_by,
      sort_by_service_area: queryParams.sort_by_service_area,
      area: queryParams.area
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
            services : elm.services,
            products : elm.products,
            contact: {
              city : elm.city, 
              tel : elm.tel1,
              email : elm.email,  
            }
          }

          this.products.push(constructors)
          
        }); 
 
      }
      
    });
  }

  getGridView(){ 
    let storageData = JSON.parse(localStorage.getItem('isGridView')); 

   console.log(storageData)

    if(typeof storageData !== 'undefined' ){
      this.isGridView = storageData;
    }
     
  }

  setGridView(){ 
    let storageData = JSON.parse(localStorage.getItem('token'));  
    localStorage.setItem('isGridView', JSON.stringify(this.isGridView) ); 
     
  }

  
  gridView(){
    this.isGridView = true;
    this.setGridView();
  }


  listView(){
    this.isGridView = false;
    this.setGridView(); 
  }

  sortChange(i, isInit = false){
    this.resetChecked(this.sortByFilter)
    this.sortByFilter[i].isChecked = true;  
    this.searchParams.sortBy = this.sortByFilter[i].id
    this.setURL(isInit);
  }


  sortByService(i, isInit = false){
    this.resetChecked(this.sortByLocation)
    this.sortByLocation[i].isChecked = true; 
    this.searchParams.sortByServiceArea = this.sortByLocation[i].id;
    console.log(i)
    if(i < 2 ){ 
      this.area = -1;
      this.setURL(isInit);
    }
    

  }

  selectedDistricts(value){
    this.area = value; 
    this.setURL(true);
  }

  selectedCities(value){
    this.area = value; 
    this.setURL(true);
  }
  

  initialSort(i){
    this.sortChange(i)
    this.sortByService(i, true)  
  }

  setURL(isInit = false){
    let url =  this.router.url + this.searchParams.sortByServiceArea + this.searchParams.sortBy;
     
    let queryParams = { 
      results: '10', 
      index: '1',
      sort_by: this.searchParams.sortBy,
      sort_by_service_area: this.searchParams.sortByServiceArea,
      area: this.area
    };
 
 
    this.router.navigate(['/products/'+this.activatedRoute.snapshot.params.id], { queryParams: queryParams });

    if(isInit){
      this.searchProducts(queryParams);
    }
  
  }

  resetChecked(arr){
    for (var key in arr) {
      arr[key]["isChecked"] = false;
    }

    return arr;
  }

}


