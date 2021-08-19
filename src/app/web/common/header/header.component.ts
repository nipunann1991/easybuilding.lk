import { Component, OnInit, ViewEncapsulation, ViewChild, Input, HostListener, ElementRef } from '@angular/core';
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { AuthService as OAuth } from "angularx-social-login";
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from "@angular/router";
import { filter } from 'rxjs/operators';
import { Globals } from "../../../app.global"
import { environment } from "../../../../environments/environment";
import { HomepageService } from "../../../web/pages/home/services/homepage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  @ViewChild('toggleButton', { static: false }) toggleButton?: ElementRef;

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
  searchText: string = "";
  isSearchOpened: boolean = false;
  mobileMenuOpen: boolean = false;
  mobileSearchOpen: boolean = false;
  isSticky: boolean = false;
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
    private homePage: HomepageService,
    private eRef: ElementRef
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


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 50;
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
      let menuArray = this.setMenuItems(response, false, "products")
      this.menuItemsProduct = this.generateMegaMenu(menuArray);

    }); 
  }
 

  getServicesMenuItems(){
    this.homePage.getServicesMenuItems() 
    .subscribe((response: any) => {

      let menuArray = this.setMenuItems(response, false, 'services');  

      this.menuItemsServices = this.generateMegaMenu(menuArray);

    }); 
  }


  getPhotosMenuItems(){
    this.homePage.getPhotosMenuItems() 
    .subscribe((response: any) => {

      let menuArray = this.setMenuItems(response, false, "photos");  

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
    let isLineBreakTitle = ""; 
    let isLineBreakText = ""; 
    this.totalLinks = 0;

    res.data.forEach((elm, index) => {   
      
      if(breakLine){
        isLineBreak = (count >= maxLength )  
      } 

      if(parentCat != elm.parent_cat_id || isLineBreak || res.data.length == (index + 1)){ 
        parentCat = elm.parent_cat_id;
       

        if(isLineBreak){ 
          isLineBreakTitle = parentCatName;
        }

        if( res.data.length == (index + 1) ){
          menuItem.push({ id: elm.id ,title: elm.cat_lvl2_name, cat_id: elm.cat_lvl2_id.toString(), url: "/"+folderUrl+"/"+ this.generateSlug(elm.cat_lvl2_name) });
        }
        
        if(menuItem.length != 0){
          menuArray.push({ 
            id: this.menuArray.length, 
            title: parentCatName , 
            break: breapoint,
            children: menuItem 
          })  
        }
        
        this.totalLinks =  this.totalLinks + menuItem.length ;
        
        menuItem = []; 
        count = 1;
      }  

      parentCatName = elm.cat_lvl1_name + isLineBreakText;  
       
      menuItem.push({ id: elm.id ,title: elm.cat_lvl2_name, cat_id: elm.cat_lvl2_id.toString(), url: "/"+folderUrl+"/"+ this.generateSlug(elm.cat_lvl2_name)});
      count++;   

    }); 
     
    let fisrtBR = false;

    menuArray.filter(x => {  
      if(x.title == isLineBreakTitle && !fisrtBR) {
        fisrtBR = true;
      } else if(x.title == isLineBreakTitle && fisrtBR){
        x.title = x.title + " <span>(Continued...)</span>";
      }  
    })
    
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
      location.reload();

    }).catch((e)=>{
        localStorage.clear();  
        this.router.navigate(['/']); 

    });    
  }

  searchTextChangeFn(event){
     
  }

  searchItems(type){

    let queryParams = { 
      string: this.searchText,
      results: '10', 
      type: type,
      index: '1', 
      sort_by: '1',
      sort_by_service_area: '1',
      area: '1',
      
    };
    
    this.isSearchOpened = false;
    this.searchText = "";
 
    this.router.navigate(['/products/search'], { queryParams: queryParams });
  
  }

  searchPhotos(){
    let queryParams = { 
      string: this.searchText,
      results: '12', 
      index: '1', 
    };
    
    this.isSearchOpened = false;
    this.searchText = "";
 
    this.router.navigate(['/photos/search'], { queryParams: queryParams });
 
  }


  toggleMobileMenu(){
    this.mobileSearchOpen = false;
    this.mobileMenuOpen = !this.mobileMenuOpen
  }

  toggleMobileSearch(){
    this.mobileMenuOpen = false;
    this.mobileSearchOpen = !this.mobileSearchOpen
  }

  generateSlug(text){
    return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
  }

  gotoURL(url){
    this.queryParams.id = url.cat_id; 
    this.router.navigate([url.url], { queryParams: this.queryParams });
  }
  

}
