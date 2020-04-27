import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
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
