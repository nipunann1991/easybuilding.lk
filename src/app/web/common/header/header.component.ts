import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from "@angular/router";
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
  menuItemsPhotos: any = []; 
  totalItemLengths: any = [];
  menuArray: any = [];
  @Input() logoOnly: boolean =  false;
  showProducts: boolean = false;
  showServices: boolean = false;
  showPhotos: boolean = false;
  profilrUrl: string = environment.profileUrl;
  uploadProductUrl: string = environment.profileUrl;
  totalLinks: number = 0;
  queryParams: any;
  hideNav: boolean = false;

  queryParamsImg = { 
    results: '12', 
    index: '1', 
  };

  user: any = {
    first_name: '',
    profie_image: ''
  }
   

  urls: any = {
    profile: environment.profileUrl,
    upload_product: environment.profileUrl.split('/').slice(0, -1).join('/') + "/products",
    settings: environment.profileUrl.split('/').slice(0, -1).join('/') + "/edit/account-info"
  }

  

  constructor(
    private authservice: Auth,
    private oauth: OAuth,
    private router: Router,
    private route: ActivatedRoute,
    private globals: Globals,
    private homePage: HomepageService
  ) { 

    this.isAccessed();
    this.user = this.globals.user;  
    this.queryParams = this.globals.defaultQueryParams;
  
  }

  ngOnInit(): void { 
      
    this.router.events.pipe( filter(e => e instanceof NavigationEnd )
    ).subscribe(e => { 
      
      if(e instanceof NavigationEnd &&  !e.url.includes("admin")){
        //(e.url.includes("user/me"))? this.hideNav = true : '' ;
        this.hideNavigation(e.url);
       
        
        this.isAccessed(); 
      }  
     
    });
 

    this.getProductsMenuItems();
    this.getServicesMenuItems();  
    this.getPhotosMenuItems();

    this.hideNavigation();

  }


  hideNavigation(url = window.location.href){

    if(url.includes("user/me")){
      this.hideNav = true
    }else{
      this.hideNav = false
    }

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

      this.menuItemsServices = this.generateMegaMenu(menuArray);

    }); 
  }


  getPhotosMenuItems(){
    this.homePage.getPhotosMenuItems() 
    .subscribe((response: any) => {

      let menuArray = this.setMenuItems(response, false, "image-search");  

      this.menuItemsPhotos = this.generateMegaMenu(menuArray); 

    }); 
  }


  setMenuItems(res, breakLine = true, folderUrl = "products"): any{
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
       
      menuItem.push({ id: elm.id ,title: elm.cat_lvl2_name, url: folderUrl+"/"+elm.cat_lvl2_id });
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
    let totalCols = menuArray.length 
    let maxCols = 3; 
    let noOfItemsPerCol =  Math.round(this.totalLinks / maxCols); 

    oldMenu.forEach((element, index) => {  

      if((totalCols <= maxCols)){

        groupedMenu.push(element); 
        newMenu.push(groupedMenu); 
        groupedMenu = [];
        lengthCount = 0;
        column++;
       

      }else{

        if( lengthCount < noOfItemsPerCol && menuArray.length != (index + 1)){ 
          groupedMenu.push(element);
  
        }else{ 
          newMenu.push(groupedMenu); 
          groupedMenu = [];
          lengthCount = 0;
          column++;
          groupedMenu.push(element); 
         
        }  
  
        if(menuArray.length == (index + 1)){
          (newMenu.length < maxCols)? newMenu.push(groupedMenu) : newMenu[(maxCols - 1)].push(...groupedMenu);
        }

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
