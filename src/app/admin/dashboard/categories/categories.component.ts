import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { CategoriesService } from '../categories/services/categories.service'; 

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

  prevLocation: any; 
  isOrderPage: boolean = false;

  links: Array<object> = [
    { id: 0, title: "Main Categories", url: "/admin/categories/main-categories" },
    { id: 1, title: "Level 1 Categories", url: "/admin/categories/level1-category" },
    { id: 2, title: "Level 2 Categories", url: "/admin/categories/level2-category" },
  ];


  orderCategories: Array<object> = [
    { id: 0, title: "Featured", url: "/admin/categories/category-order/0" },
  ]
    
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private categories: CategoriesService,
  ) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         if(event.url === '/admin/categories'){ 
		      this.router.navigate(['admin/categories/main-categories']); 
          this.isOrderPage = false;

         }else if(event.url.includes('/admin/categories/category-order')){
            this.isOrderPage = true;
         }else{
            this.isOrderPage = false;
         }
      }
    });

  }

  ngOnInit(): void {
     this.getMainCategories(); 
  }

  getMainCategories(){
    this.categories.getMainCategories().subscribe({
      next: (data: any) =>{  
        let results = data; 
        results.data.forEach(element => {
          this.orderCategories.push({ id: element.id, title: element.cat_name, url: "/admin/categories/category-order/"+element.cat_id })
        }); 

      },
      error: err =>{
        console.log(err)
      }
    })
  }

}
