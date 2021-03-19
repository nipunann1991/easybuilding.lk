import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-boq',
  templateUrl: './boq.component.html',
  styleUrls: ['./boq.component.scss']
})
export class BoqComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { 

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         if(event.url === '/admin/boq'){ 
		        this.router.navigate(['admin/boq/house-areas']);  
         }
      }
    });

  }

  prevLocation: any; 
  links: any = [
    { id: 0, title: "House Areas", url: "/admin/boq/house-areas" },
    { id: 1, title: "Surface", url: "/admin/boq/house-surfaces" },
    { id: 2, title: "Surface Type", url: "/admin/boq/house-surface-types" },
  ];

  ngOnInit(): void {
  }

}
