import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  prevLocation: any; 
  links: any = [
    { id: 0, title: "Main Categories", url: "/admin/categories/main-categories" },
    { id: 1, title: "Level 1 Categories", url: "/admin/categories/level1-category" },
    { id: 2, title: "Level 2 Categories", url: "/admin/categories/level2-category" },
  ];
    
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         if(event.url === '/admin/categories'){ 
		      this.router.navigate(['admin/categories/main-categories']); 
          
         }
      }
    });

  }

  ngOnInit(): void {
     
  }

}
