import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { Router, NavigationEnd, RouterEvent } from "@angular/router";
import { filter } from 'rxjs/operators';
import { Globals } from "../../../app.global"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false; 
  editableMode: boolean = false; 
  menuItemCols: any; 
  totalItemLengths: any = [];

  user: any = {
    first_name: '',
    profie_image: ''
  }

  constructor(
    private authservice: Auth,
    private router: Router,
    private globals: Globals
  ) { 

    this.isAccessed();
    this.user = this.globals.user;
      
  }

  ngOnInit(): void {

    
    this.menuItemCols =  [{
        "id": "1;",
        "title": "Construction Contractors",
        "break": true,
        "children": [
          {
            "title": "House Construction Contractors",
            "url": "/products/house-construction-contractors"
          },
          {
            "title": "Commercial Building Contraction Contractors",
            "url": "/"
          },
          {
            "title": "Steel Building Contractors",
            "url": "/"
          },
          {
            "title": "Road & Infrastructure Building Contractors",
            "url": "/"
          },
          {
            "title": "Building Painters",
            "url": "/"
          },
          {
            "title": "Landscaping & Paving Contractors",
            "url": "/"
          },
          {
            "title": "Grass Cutters & Tree Cutters",
            "url": "/"
          },
          {
            "title": "Carpenters & Wood workers",
            "url": "/"
          },
          {
            "title": "Plumbing Contractors",
            "url": "/"
          },
          {
            "title": "Water Proofing Contractors",
            "url": "/"
          },
          {
            "title": "Soil & Concrete testing Contractors",
            "url": "/"
          },
          {
            "title": "Aluminum and Glass Contractors",
            "url": "/"
          },
          {
            "title": "Masons",
            "url": "/"
          },
          {
            "title": "Steel Fences, Steel Gate  Contractors & Welders",
            "url": "/"
          },
          {
            "title": "Titanium, Terrazzo & Tiling Contractors",
            "url": "/"
          },
          {
            "title": "Pest Controllers",
            "url": "/"
          },
          {
            "title": "Roller Gates & Roller Door Makers",
            "url": "/"
          },
          {
            "title": "Swimming Pool Makers",
            "url": "/"
          },
          {
            "title": "Gully Bowsers & West Removal",
            "url": "/"
          }
        ]
      },{
        "id": "2",
        "title": "Construction Contractors E",
        "break": false,
        "children": [
          {
            "title": "House Construction Contractors",
            "url": "/"
          },
          {
            "title": "Commercial Building Contraction Contractors",
            "url": "/"
          },
          {
            "title": "Steel Building Contractors",
            "url": "/"
          },
          {
            "title": "Road & Infrastructure Building Contractors",
            "url": "/"
          },
          {
            "title": "Building Painters",
            "url": "/"
          }
        ]
      },{
        "id": "3",
        "title": "House Interior Construction Contractors",
        "break": false,
        "children": [
          {
            "title": "Landscaping & Paving Contractors",
            "url": "/"
          },
          {
            "title": "Grass Cutters & Tree Cutters",
            "url": "/"
          },
          {
            "title": "Carpenters & Wood workers",
            "url": "/"
          },
          {
            "title": "Plumbing Contractors",
            "url": "/"
          },
          {
            "title": "Water Proofing Contractors",
            "url": "/"
          }
        ]
      },{
        "id": "4",
        "title": "House Interior Construction Contractors",
        "break": true, 
        "children": [
          {
            "title": "Landscaping & Paving Contractors",
            "url": "/"
          },
          {
            "title": "Grass Cutters & Tree Cutters",
            "url": "/"
          },
          {
            "title": "Carpenters & Wood workers",
            "url": "/"
          },
          {
            "title": "Plumbing Contractors",
            "url": "/"
          },
          {
            "title": "Water Proofing Contractors",
            "url": "/"
          }
        ]
      },{
        "id": "4",
        "title": "House Interior Construction Contractors",
        "break": false, 
        "children": [
          {
            "title": "Landscaping & Paving Contractors",
            "url": "/"
          },
          {
            "title": "Grass Cutters & Tree Cutters",
            "url": "/"
          },
          {
            "title": "Carpenters & Wood workers",
            "url": "/"
          },
          {
            "title": "Plumbing Contractors",
            "url": "/"
          },
          {
            "title": "Water Proofing Contractors",
            "url": "/"
          },
          {
            "title": "Carpenters & Wood workers",
            "url": "/"
          },
          {
            "title": "Plumbing Contractors",
            "url": "/"
          },
          {
            "title": "Water Proofing Contractors",
            "url": "/"
          },
         
        ]
      },{
        "id": "4",
        "title": "House Interior Construction Contractors",
        "break": true, 
        "children": [
          {
            "title": "Landscaping & Paving Contractors",
            "url": "/"
          },
          {
            "title": "Grass Cutters & Tree Cutters",
            "url": "/"
          },
          {
            "title": "Carpenters & Wood workers",
            "url": "/"
          },
          {
            "title": "Plumbing Contractors",
            "url": "/"
          },
          {
            "title": "Water Proofing Contractors",
            "url": "/"
          }
        ]
      }];
        

    this.router.events.pipe( filter(e => e instanceof NavigationEnd )
    ).subscribe(e => { 
      
      if(e instanceof NavigationEnd &&  !e.url.includes("admin")){
        this.isAccessed(); 
     }
    });

    this.generateMegaMenu();  
  }

  generateMegaMenu() :void{

    let x = [];
    let oldMenu = this.menuItemCols;
    this.menuItemCols = [];

    oldMenu.forEach((element) => {

      x.push(element);

      if(element.break){ 
        this.menuItemCols.push( x);
        x = [];
      }
      
      
    });
    
  }
  

  isAccessed(){
    if(this.authservice.isAuthenticated()){ 
      this.isLogged = true;
    }else{ 
      this.isLogged = false;
    }
  }

}
