import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CategoriesService } from '../../services/categories.service'; 
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-order',
  templateUrl: './category-order.component.html',
  styleUrls: ['./category-order.component.scss']
})
export class CategoryOrderComponent implements OnInit {

  selectedCategory: string;
  getFeaturedData: Array<any> = [];
  categoryData: object = { isAdmin: true, data: "" }; 

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private categories: CategoriesService,
    private toastr: ToastrService,
    private location: Location
  ) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {   
        this.selectedCategory = this.activatedRoute.snapshot.queryParams.name;
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
      },

      error: err =>{
        console.log(err);
      }

    })
  }

  loadCategoryData(catID){ 
    switch (catID) {
      case '0':
        this.getFeaturedCategories();
        break;
    
      default:
        this.getFeaturedData = [];
        break;
    }
  }

  drop(event: CdkDragDrop<string[]>) { 
    moveItemInArray(this.getFeaturedData, event.previousIndex, event.currentIndex);
    this.getFeaturedData.map((x,i)=> { x.featured_order = i + 1});
  }

  saveFeatured(){
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
    console.log(this.getFeaturedData)
  }

}
