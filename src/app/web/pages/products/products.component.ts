import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener  } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from "./services/search.service";
import { MyAccountService } from '../my-account/services/my-account.service';
import { environment } from "../../../../environments/environment";
import { HomepageService } from "../home/services/homepage.service"; 
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Options } from 'select2'; 
import { Globals } from "../../../app.global"
import { filter } from 'rxjs/operators';
import { AppSEO } from "./../../../app.seo";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ProductsComponent implements OnInit, OnDestroy {

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
  menuArray: any = [];
  categoriesList: any = [];
  totalLinks: number = 0;
  isFullPageSearch: boolean = false;
  isFilterOpen: boolean = false;
  queryParams: any;
  searchParam: string = "";
  paginations: Array<number> = [];
  paramIndex: number; 
  isSticky: boolean = false;
  _routeListener: any;
  starRating:any = Array.from(Array(this.globals.starRating), (_, index) => index + 1);
  searchParams = {
    sortBy: "",
    sortByServiceArea: ""
  }

  
  slideConfig = {
    slidesToShow: 5, slidesToScroll: 5,  infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4, 
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

  private prevParam: string = ""; 
  private prevQueryParam: any = ""; 
  
  public options: Options;
  formGroup: FormGroup;

  constructor(
    private myaccount: MyAccountService,
    private search: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private homePage: HomepageService,
    private platformLocation: PlatformLocation,
    private globals: Globals,
    private seo: AppSEO,
  ) { 
   
    this.queryParams = this.globals.defaultQueryParams; 
    this._routeListener =  this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) { 
          window.scroll(0,0);
          this.prevParam = this.activatedRoute.snapshot.params.id; 
          this.prevQueryParam = this.activatedRoute.snapshot.queryParams;  
          this.paramIndex = parseInt(this.activatedRoute.snapshot.queryParams.index); 
          this.getSelectedProductData();  
          this.filterOptions();   
          (JSON.stringify(this.activatedRoute.snapshot.queryParams) !==  '{}')? this.searchProducts(this.activatedRoute.snapshot.queryParams, true) : "";  
      }
        
    });

    this.platformLocation.onPopState(() => { 
      (JSON.stringify(this.activatedRoute.snapshot.queryParams) !==  '{}')? this.searchProducts(this.activatedRoute.snapshot.queryParams, true) : "";  
    });
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
    this.pageSEO(this.pageData);  
     
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
  }

  ngOnDestroy() { 
    this._routeListener.unsubscribe();
  }

  getSelectedProductData(){ 

    let currentRouteID = 0; 
    let isSearchString = this.activatedRoute.snapshot.params['id'] === 'search';
    let isSearchUndefined = typeof this.activatedRoute.snapshot.params['id'] == 'undefined';

    switch (this.router.url.split('/')[1]) {
      case 'photos':
        currentRouteID = 3;
        break;

      case 'services':
          currentRouteID = 2;
          break;
      
      case 'products':
        currentRouteID = 1;
        break; 
    }
     
    let params = { cat_lvl2_id: currentRouteID };  

    if(params.cat_lvl2_id == 1 && !isSearchString && isSearchUndefined){
      this.isFullPageSearch = true;
      this.pageData = {  parentCategory: "Search", categoryLevel1: "Products", categoryLevel2: "Products" } 
      this.getProductsMenuItems()
      

    }else if(params.cat_lvl2_id == 2 && !isSearchString && isSearchUndefined){
      this.isFullPageSearch = true;
      this.pageData = { parentCategory: "Search", categoryLevel1: "Services", categoryLevel2: "Services" } 
      this.getServicesMenuItems()
     

    }else if(params.cat_lvl2_id == 3 && !isSearchString && isSearchUndefined){
      this.isFullPageSearch = true;
      this.pageData = { parentCategory: "Search", categoryLevel1: "Photos", categoryLevel2: "Photos" } 
      this.getPhotosMenuItems()
       

    }else if(isSearchString){ 
      this.isFullPageSearch = false;
      this.searchParam = this.activatedRoute.snapshot.queryParams["string"];

      this.pageData = {
        parentCategory: this.activatedRoute.snapshot.queryParams["type"] ,
        categoryLevel1: "Search Results",
        categoryLevel2: "Search '"+ this.searchParam +"'" 
      }  
    
    }else{
      
      this.isFullPageSearch = false;     
      let params = { cat_lvl2_id: this.activatedRoute.snapshot.queryParams.id }; 
       
      this.search.getSelectedProductData(params) 
        .subscribe((response: any) => {

          if (response.status == 200) {
  
              let page = response.data[0];

              this.pageData = {
                parentCategory: page.cat_name,
                categoryLevel1: page.cat_lvl1_name,
                categoryLevel2: page.cat_lvl2_name
              } 
  
          }
          
        }); 
 
    }  
 
  }

  setMenuItems(res, breakLine = true, folderUrl = "products"): any{
    let parentCat = ""
    let parentCatName = ""
    let menuItem = [];
    let menuArray = []; 
    let breapoint = true;
    let count = 1; 
    let maxLength = 10; 
    let isLineBreak = false; 
    this.totalLinks = 0;

    res.data.forEach((elm, index) => {  
      
      if(breakLine){
        isLineBreak = (count >= maxLength )
      }

      let bgImage = ""; 
      (elm.file_name != '')?  bgImage ='url('+ environment.uploadPath+"admin/category/thumb/"+elm.file_name : bgImage = '';

      if(parentCat != elm.parent_cat_id || isLineBreak || res.data.length == (index + 1)){ 
        parentCat = elm.parent_cat_id;  

        if( res.data.length == (index + 1) ){
          menuItem.push({ id: elm.id ,title: elm.cat_lvl2_name, cat_id: elm.cat_lvl2_id.toString(), url: "/"+folderUrl+"/"+ this.generateSlug(elm.cat_lvl2_name), file_name: bgImage });
        }
         
        (menuItem.length != 0)? menuArray.push({ 
          id: this.menuArray.length, 
          title: parentCatName, 
          break: breapoint,
          children: menuItem 
        }) : '';
        
        this.totalLinks =  this.totalLinks + menuItem.length ;
        
        menuItem = []; 
        count = 1;
      } 

      parentCatName = elm.cat_lvl1_name;   
       
      menuItem.push({ id: elm.id ,title: elm.cat_lvl2_name, cat_id: elm.cat_lvl2_id.toString(), url: "/"+folderUrl+"/"+ this.generateSlug(elm.cat_lvl2_name), file_name: bgImage });
      count++;   

    }); 

    return menuArray;

  }


  generateSlug(text){
    return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
  }
 

  gotoURL(url){
    this.queryParams.id = url.cat_id; 
    this.router.navigate([url.url], { queryParams: this.queryParams });
  }

  capitalizeString(name): string{
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  getProductsMenuItems(){
    this.homePage.getProductsMenuItems() 
    .subscribe((response: any) => {
       
     this.categoriesList = this.setMenuItems(response)
     
    }); 
  }


  getServicesMenuItems(){
    this.homePage.getServicesMenuItems() 
    .subscribe((response: any) => {

      this.categoriesList = this.setMenuItems(response, false, "services");   

    }); 
  }


  getPhotosMenuItems(){
    this.homePage.getPhotosMenuItems() 
    .subscribe((response: any) => {
      this.categoriesList = this.setMenuItems(response, false, "photos");    
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


  searchProducts(queryParams, firstAttempt = false ){

    this.products = []; 
 
    let params = { 
      cat_lvl2_id: this.activatedRoute.snapshot.queryParams.id, 
      limit: queryParams.results, 
      page_index: queryParams.index,
      sort_by: queryParams.sort_by,
      sort_by_service_area: queryParams.sort_by_service_area,
      area: queryParams.area,
      searchString: queryParams.string || ''
    };  

    if(firstAttempt){
      this.sortByFilter[queryParams.sort_by - 1].isChecked = true;  
      this.sortByLocation[queryParams.sort_by_service_area - 1].isChecked = true; 
      this.searchParams.sortBy = this.sortByFilter[queryParams.sort_by - 1].id 
      this.searchParams.sortByServiceArea = this.sortByLocation[queryParams.sort_by_service_area - 1].id;
    }
    

    this.search.searchProducts(params) 
    .subscribe((response: any) => {

      if (response.status == 200) {

        this.pageData.start = response.start;
        this.pageData.end = response.end;
        this.pageData.total_results = response.total_results;

        
        let totalPages = Math.floor(this.pageData.total_results / queryParams.results);
        let remainingElms = this.pageData.total_results % queryParams.results;
          

        if( remainingElms != 0){
          this.paginations = Array(totalPages + 1).fill(0).map((x,i)=>i + 1);
        }else{
          this.paginations =  Array(totalPages).fill(0).map((x,i)=>i + 1);
        } 

        this.products = []

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
            isAllIsland : elm.all_island,
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
   

  setURL(isInit = false){ 
     
    let queryParams = { 
      results: '10', 
      index: '1',
      sort_by: this.searchParams.sortBy,
      sort_by_service_area: this.searchParams.sortByServiceArea,
      area: this.area, 
    };
    
    if(this.router.url.includes('string=')){
      queryParams["string"] = this.activatedRoute.snapshot.queryParams.string
    }
  
    this.router.navigate(['/products/'+this.activatedRoute.snapshot.params.id], { queryParams: queryParams });
  
  }

  resetChecked(arr){
    for (var key in arr) {
      arr[key]["isChecked"] = false;
    }

    return arr;
  }


  navigateToNextPage(pageID){
    
    let queryParams =  {...this.activatedRoute.snapshot.queryParams};
    queryParams['index'] = pageID;
    this.router.navigate(['/products/'+this.activatedRoute.snapshot.params.id], { queryParams: queryParams });
  }

  toggleFilterArea(){
    this.isFilterOpen = !this.isFilterOpen;
  }

  addSlide() {
     
  }
  
  removeSlide() {
    
  }
  
  slickInit(e) {
   
  }
  
  breakpoint(e) {
    
  }
  
  afterChange(e) {
    
  }
  
  beforeChange(e) {
    
  }


  pageSEO(pageData: any) : void{

   // console.log(this.pageData)

    let seoData = {
      title: 'EasyBuilding.lk | '+ this.pageData.categoryLevel2,
      keywords: 'Construction Services in Colombo Galle Kalutara Gampaha Srilanka,Vehicle A/C Repairs, Electrician,Plumber Colmbo Srilanka,Tile Services, Construction Deals,Mason baas,House builders Srilanka,ManPower,WorkForce,Construction Services, Construction Rates, BOQ, Quotation Requests, Construction Deals,Easybuilding, Easybuilding.lk, Easybuilding Deals, Own Quotation Requests, House construction, Building construction, Contrcators, inteiror, plumbers, Painters,  architects, structural engineers, civil construction, repair',
      description: 'We are a leading online House and Building construction market place connecting potential house and commercial building construction clients with quality and reliable construction companies, individual contractors, masons, plumbers, electricians, and construction and interior material suppliers.',
      image: ''
    }

    this.seo.setSEOData(seoData)
  }

}


