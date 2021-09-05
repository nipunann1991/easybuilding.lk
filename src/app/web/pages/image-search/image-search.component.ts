import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from "../../pages/products/services/search.service";
import { MyAccountService } from '../my-account/services/my-account.service';
import { environment } from "../../../../environments/environment";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Options } from 'select2'; 
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery'; 
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['../products/products.component.scss'], 
  encapsulation: ViewEncapsulation.None
})
export class ImageSearchComponent implements OnInit {

  pageData: any = {};
  sortByFilter: any = [];
  sortByRating: any = [];
  sortByCategory: any = [];
  sortByLocation: any = [];
  allServices: any = [];
  imageSearch: any = [];
  serviceAreaCities: any = []; 
  serviceAreaDistricts: any = []; 
  isGridView: boolean = false;
  area: number = -1;
  searchParams = {
    sortBy: "",
    sortByServiceArea: ""
  }

  openImageIndex: number = 0;
  galleryId = 'myLightbox';
  paginations: Array<number> = []; 
  paramIndex: number;
  searchParam: string = "";


  //pagination
  pageOfItems: Array<number>;
  collection: Array<number> = [];
  currentPage: number = 0;
  itemsPerPage: number = 0;
  totalItems: number = 0;

  // gallery images
  imagesResults: GalleryItem[] = [];
  private prevParam: string = ""; 
  public options: Options;
  formGroup: FormGroup;
  private galleryRef = this.gallery.ref(this.galleryId)

  constructor(
    private myaccount: MyAccountService,
    private search: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public gallery: Gallery, 
    private lightbox: Lightbox
  ) { 
 
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) { 
        window.scroll(0,0);    
        this.isGridView = true; 
        this.prevParam = this.activatedRoute.snapshot.params.id;
        this.paramIndex = parseInt(this.activatedRoute.snapshot.queryParams.index); 
        this.getSelectedProductData(); 
      }
      
    })
  }
 
  ngOnInit(): void { 
  
    this.formGroup = new FormGroup({   

      services: new FormControl("", [
        Validators.required
      ]),  
      
    });

    
    this.galleryRef.setConfig({
      thumbPosition: 'bottom',
      imageSize: 'cover',
      loop: true,
      thumb: false,
      thumbMode: "free"
    }); 

    this.options = {
      multiple: false, 
      closeOnSelect: true, 
      tags: true 
    }; 
     
  }

  getSelectedProductData(){  

    if( this.activatedRoute.snapshot.queryParams["string"] === undefined) {

      let params = { cat_lvl2_id: this.activatedRoute.snapshot.queryParams.id }; 

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
  
    }else{ 

      this.searchParam = this.activatedRoute.snapshot.queryParams["string"];
      
      this.pageData = {
        parentCategory: "Photos",
        categoryLevel1: "Search Results",
        categoryLevel2: "Search '"+ this.searchParam +"'"
      }  

    }

    this.searchImages(this.activatedRoute.snapshot.queryParams); 
    
  }
  

  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
     
    });
  } 

  searchImages(queryParams){ 

    if(queryParams.id){ this.searchParam = ""; }

    let params = { 
      cat_lvl2_id: (this.activatedRoute.snapshot.params.id == 'search')? this.activatedRoute.snapshot.params.id : this.activatedRoute.snapshot.queryParams.id, 
      limit: queryParams.results, 
      page_index: queryParams.index,
      sort_by: queryParams.sort_by,
      sort_by_service_area: queryParams.sort_by_service_area,
      area: queryParams.area,
      searchString: queryParams.string
    };  

    this.search.searchImages(params) 
    .subscribe((response: any) => {

      if (response.status == 200) {
        
        this.pageData.start = response.start;
        this.pageData.end = response.end;
        this.pageData.total_results = response.total_results;

        let queryParams = this.activatedRoute.snapshot.queryParams;

        this.totalItems = this.pageData.total_results;
        this.currentPage = queryParams.index;
        this.itemsPerPage = queryParams.results; 

        this.imageSearch = []; 
        this.imagesResults = []; 
        
        response.data.forEach(elm => {
         
          let profileImgThumb = environment.uploadPath + elm.client_id +'/'+ elm.company_id +'/projects/thumb/';
          let profileImg = environment.uploadPath + elm.client_id +'/'+ elm.company_id +'/projects/';
 
          if (elm.file_name == ''){
            profileImgThumb = '';
            profileImg = "";
            
          }else{
            profileImgThumb = profileImgThumb + elm.file_name
            profileImg = profileImg + elm.file_name;
          }

          let constructors = {
            id: elm.client_id,
            title: elm.display_name, 
            project_name: elm.project_name, 
            profileLink: '/user/'+ elm.client_id +'/'+ elm.provider_id +'/about', 
            imgUrl: profileImgThumb,  
            imgUrlFull: profileImg,  
            architect: elm.architect
          }

          this.imagesResults.push(new ImageItem({ src: profileImg, thumb: profileImgThumb }));
          this.galleryRef.load(this.imagesResults); 
          this.imageSearch.push(constructors)
          
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
  

  initialSort(i){
    this.sortChange(i)
    this.sortByService(i, true)  
  }

  setURL(isInit = false){
    let url =  this.router.url + this.searchParams.sortByServiceArea + this.searchParams.sortBy;
     
    let queryParams = { 
      results: '12', 
      index: '1', 
    };
 

    if(isInit){
      this.searchImages(queryParams);
    }
  
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
    this.router.navigate(['/photos/'+this.activatedRoute.snapshot.params.id], { queryParams: queryParams });
  
  }

  pageChanged(e){  
   console.log(e)
 }

}
