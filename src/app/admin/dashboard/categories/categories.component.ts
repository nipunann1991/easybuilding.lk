import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  prevLocation: any;
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
