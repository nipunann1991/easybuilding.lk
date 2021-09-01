import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CategoriesService } from '../../services/categories.service'; 
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { HomepageService } from "../../../../../web/pages/home/services/homepage.service";
import { param } from 'jquery';


@Component({
  selector: 'app-category-order',
  templateUrl: './category-order.component.html',
  styleUrls: ['./category-order.component.scss']
})
export class CategoryOrderComponent implements OnInit {

  selectedCategory: string;
  selectedChildCategory: string;
  getFeaturedData: Array<any> = [];
  getServicesData: Array<any> = [];
  getServicesChildData: Array<any> = [];
  isFeatured: boolean = false;
  isServices: boolean = false;
  isSortSecondLevel: boolean = false;

  categoryData: object = { isAdmin: true, data: "" }; 

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private categories: CategoriesService,
    private toastr: ToastrService,
    private location: Location,
    private homePage: HomepageService,
  ) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {   
        this.selectedCategory = this.activatedRoute.snapshot.queryParams.name;
        this.closeSecondLvlNav();
        this.loadCategoryData(this.activatedRoute.params["value"].id);
        
      }
    }); 

  }

  ngOnInit(): void {
    
  }

  getFeaturedCategories(){ 
    this.categories.getFeaturedCategories().subscribe({
      next: (data:any) =>{
        this.getFeaturedData = data.data; 
        this.isFeatured = true;
      },

      error: err =>{
        console.log(err);
      }

    })
  }

  loadCategoryData(catID){ 

    this.resetView();

    switch (catID) {
      case '0':
        this.getFeaturedCategories();
        break; 
    
      default:
        this.getServices(catID);
        break;
    }
  }

  resetView(){
    this.isFeatured = false;
    this.isServices = false;
  }

  dropFeatured(event: CdkDragDrop<string[]>) { 
    moveItemInArray(this.getFeaturedData, event.previousIndex, event.currentIndex);
    this.getFeaturedData.map((x,i)=> { x.featured_order = i + 1});
  }

  dropServices(event: CdkDragDrop<string[]>){
    moveItemInArray(this.getServicesData, event.previousIndex, event.currentIndex);
    this.getServicesData.map((x,i)=> { x.sort_order = i + 1}); 
  }

  dropChildServices(event: CdkDragDrop<string[]>){
    moveItemInArray(this.getServicesChildData, event.previousIndex, event.currentIndex);
    this.getServicesChildData.map((x,i)=> { x.sort_order = i + 1}); 
  }

  saveFeaturedOrder(){
    let params = { data: JSON.stringify(this.getFeaturedData) };  
 
    this.categories.updateFeaturedCategory(params).subscribe({
      next: (response: any) =>{ 
        if (response.status == 200) { 
          this.categoryData = { isAdmin: true, data: JSON.stringify(this.getFeaturedData) };
          this.toastr.success('Featured category has been re-ordered successfully', 'Success !');  
        
        }else{
          this.toastr.error('Featured category re-ordering failed. Please try again', 'Error !'); 
        }

      },
      error: err =>{
        console.log(err)
      }
    })
   
  }


  saveServicesOrder(){
    let params = { data: JSON.stringify(this.getServicesData) };  
 
    this.categories.updateLvl1CategoryOrder(params).subscribe({
      next: (response: any) =>{ 
        if (response.status == 200) {  
          this.toastr.success('Categories has been re-ordered successfully', 'Success !');  
        
        }else{
          this.toastr.error('Category re-ordering failed. Please try again', 'Error !'); 
        }

      },
      error: err =>{
        console.log(err)
      }
    })
   
  }

  saveServicesChildOrder(){
    let params = { data: JSON.stringify(this.getServicesChildData) };  
 
    this.categories.updateLvl2CategoryOrder(params).subscribe({
      next: (response: any) =>{ 
        if (response.status == 200) {  
          this.closeSecondLvlNav();
          this.toastr.success('Sub categories has been re-ordered successfully', 'Success !');  
        
        }else{
          this.toastr.error('Category re-ordering failed. Please try again', 'Error !'); 
        }

      },
      error: err =>{
        console.log(err)
      }
    })
   
  }

  getServices(catID){ 
    let params = { parent_cat_id: catID }

    this.categories.getSelectedLvl1CategoryByID(params).subscribe({
      next: (res: any) =>{    
        this.getServicesData = res.data;
        this.isServices = true;    
      },
      error: err =>{
        console.log(err)
      }
    })
  } 

  getChildCategories(ParentCatID){

    let params = { parent_cat_id: ParentCatID }

    this.categories.getLvl2Categories(params).subscribe({
      next: (res: any) =>{
        this.getServicesChildData = res.data;
      },

      error: err =>{
        console.log(err);
      }

    })
  }

  groupBy(list, keyGetter, keyGetterID) {
    const map = new Map();
    let catData = [];

    list.forEach((item) => { 
      const key = keyGetter(item);
      const id = keyGetterID(item);
      const collection = map.get(key);

      if (!collection) { 
        catData.push({ id: id, cat_lvl1_name: key, subCategories: [item] })
        map.set(key, [item]); 
      } else {
        catData[catData.length - 1].subCategories.push(item);
      }

    });

    return catData;
  }

  close(){
    this.router.navigate(['/admin/categories'])
  }


  openSecondLvlNav(catID, selectedLvl1Title){
    this.isSortSecondLevel = true;  
    this.selectedChildCategory = selectedLvl1Title;
    this.getChildCategories(catID); 
  }

  closeSecondLvlNav(){
    this.isSortSecondLevel = false;
    this.getServicesChildData = [];
  }

}
