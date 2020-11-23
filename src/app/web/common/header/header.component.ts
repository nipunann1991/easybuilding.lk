import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { Router, NavigationEnd, RouterEvent } from "@angular/router";
import { filter } from 'rxjs/operators';
import { Globals } from "../../../app.global"
import { environment } from "../../../../environments/environment";
import { HomepageService } from "../../../admin/api/frontend/homepage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false; 
  editableMode: boolean = false; 
  menuItemsProduct: any = []; 
  menuItemsServices: any = []; 
  totalItemLengths: any = [];
  menuArray: any = [];
  @Input() logoOnly: boolean =  false;
  profilrUrl: any = environment.profileUrl;
  totalLinks: number = 0;
  user: any = {
    first_name: '',
    profie_image: ''
  }

  constructor(
    private authservice: Auth,
    private oauth: OAuth,
    private router: Router,
    private globals: Globals,
    private homePage: HomepageService
  ) { 

    this.isAccessed();
    this.user = this.globals.user;  
    
  
  }

  ngOnInit(): void {
      console.log(this.logoOnly)
    
   

    this.router.events.pipe( filter(e => e instanceof NavigationEnd )
    ).subscribe(e => { 
      
      if(e instanceof NavigationEnd &&  !e.url.includes("admin")){
        this.isAccessed(); 
     }
    });

    this.getProductsMenuItems();
    this.getServicesMenuItems();  
  }


  
 
  getProductsMenuItems(){
    this.homePage.getProductsMenuItems() 
    .subscribe((response: any) => {
      let menuArray = this.setMenuItems(response)
      this.menuItemsProduct = this.generateMegaMenu(menuArray);

    }); 
  }


  getServicesMenuItems(){
    this.homePage.getServicesMenuItems() 
    .subscribe((response: any) => {

      let menuArray = this.setMenuItems(response, false); 
      console.log(menuArray);

      this.menuItemsServices = this.generateMegaMenu(menuArray);

    }); 
  }


  setMenuItems(res, breakLine = true): any{
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

      if(parentCat != elm.parent_cat_id || isLineBreak || res.data.length == (index + 1)){ 
        parentCat = elm.parent_cat_id;  
         
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
       
      menuItem.push({ id: elm.id ,title: elm.cat_lvl2_name, url: "products/"+elm.cat_lvl2_id });
      count++;   

    }); 

    return menuArray;

  }


  generateMegaMenu(menuArray): any{

    let groupedMenu = [];
    let oldMenu = menuArray;
    let newMenu = [];
    let lengthCount = 0;
    let totalCount = 0; 
    let column = 0; 

    let noOfItemsPerCol =  Math.round(this.totalLinks / 3); 

    oldMenu.forEach((element, index) => { 
      
      if( lengthCount < noOfItemsPerCol && menuArray.length != (index + 1) ){ 
        groupedMenu.push(element);

      }else{ 
        newMenu.push(groupedMenu); 
        groupedMenu = [];
        lengthCount = 0;
        column++;
        groupedMenu.push(element); 
       
      }  

      if(menuArray.length == (index + 1)){
        (newMenu.length < 3)? newMenu.push(groupedMenu) : newMenu[2].push(...groupedMenu);
      }
        
      lengthCount = lengthCount + element.children.length;
      totalCount = totalCount + element.children.length; 
       
    });
     
    return newMenu; 
    
  }


  isAccessed(){
    if(this.authservice.isAuthenticated()){ 
      this.isLogged = true;
    }else{ 
      this.isLogged = false;
    }
  }

  signOut(): void {
    this.oauth.signOut().then( (userDetails) =>{  
      localStorage.clear();  
      this.router.navigate(['/']); 

    }).catch((e)=>{
        localStorage.clear();  
        this.router.navigate(['/']); 

    });    
  }

}
