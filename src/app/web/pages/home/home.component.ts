import { Component, OnInit, ViewEncapsulation, ViewChild, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { AppSEO } from "./../../../app.seo"; 
import { HomepageService } from "../../../admin/api/frontend/homepage.service";
import { environment } from "../../../../environments/environment";
import { gsap, TweenMax,  TimelineMax } from "gsap";   
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globals } from "../../../app.global";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],  
})
export class HomeComponent implements OnInit {
  
  @ViewChildren('banner') banner:QueryList<Element>;
  featuredProfList: any = [];
  featuredProdList: any = [];
  featuredProductsCategories: any = [];
  adSlides: any = [];
  bgImagePath = environment.uploadPath + "admin/home-slider/" ;  
  bgImageCatPath = environment.uploadPath + "admin/category/thumb/"
  BannerImgs: any = "";
  BannerArray:any = [];
  currBannerItem: number = -1; 
  slideConfig = {"slidesToShow": 5, "slidesToScroll": 5,  infinite: false,};
  queryParams =  { results: '10',  index: '1'}; 
  
  constructor(
    private seo: AppSEO, 
    private homePage: HomepageService,
    private globals: Globals,
    ) {    
    gsap.registerPlugin(ScrollTrigger); 
    this.pageSEO();  
  }
 
  ngOnInit(): void { 
    
    window.scroll(0,0);  

    this.getConstructorList();
    this.getAdSlides(); 
    this.getFeaturedProductsCategories();
    this.getFeaturedProducts();

  }

  ngAfterViewInit() {
    //this.pageAnimation();   
    
  }


  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

  getConstructorList(){ 
      
    this.homePage.getConstructors() 
      .subscribe((response: any) => {

        response.data.forEach(elm => {
         
          let profileImg = environment.uploadPath + elm.client_id +'/'+ elm.company_id +'/';

          (elm.profie_image == '')?  profileImg = ''  : profileImg = profileImg + elm.profie_image  ;

          let constructors = {
            id: elm.client_id,
            title: elm.display_name, 
            description: elm.description,
            profileLink: '/user/'+ elm.client_id +'/'+ elm.provider_id +'/about', 
            imgUrl: profileImg,
            rating:  elm.rating,
            total_reviews : elm.total_reviews,
            contact: {
              city : elm.city, 
              tel : elm.tel1, 
            }
          }

          this.featuredProfList.push(constructors)

         
        });
 
          
      }); 
  
  }


  getAdSlides(){ 
      
    this.homePage.getAdSlides() 
      .subscribe((response: any) => {
 
        if (response.status == 200) { 

          this.adSlides = response.data;

          let listElms = []; 

          setTimeout(() => {  
      
            this.banner.toArray().forEach((element: any) => {
              listElms.push(element.nativeElement)
            });
       
            this.BannerArray = [].slice.call(listElms);    
            this.currBannerItem = -1;
            this.nextBanner(); 
           }); 
          

        }else{
            
        }

        ; 
          
      }); 
  
  }
    
  getFeaturedProductsCategories(){

    this.homePage.getFeaturedProductsCategories() 
      .subscribe((response: any) => {
 
        if (response.status == 200) {   
          this.featuredProductsCategories = response.data;

        }else{
            
        }
  
      }); 
  }


  getFeaturedProducts(){

    this.homePage.getFeaturedProducts() 
      .subscribe((response: any) => {
 
        if (response.status == 200) {   

          response.data.forEach(elm => {
         
            let profileImg = environment.uploadPath + elm.client_id +'/'+ elm.company_id +'/';
  
            (elm.primary_img == '')?  profileImg = ''  : profileImg = profileImg + "products/thumb/" + elm.primary_img  ;
  
            let featuredProducts = {
              id: elm.client_id,
              product_name: elm.product_name, 
              product_desc: elm.product_desc,
              profileLink: '/user/'+ elm.client_id +'/'+ elm.provider_id +'/products', 
              imgUrl: profileImg, 
              display_name: elm.display_name,
              price: elm.product_price,
              currency: this.globals.currencyAlias,
              unit: this.globals.unitList[elm.product_unit - 1].text
            }
  
            this.featuredProdList.push(featuredProducts);
  
           
          });

          console.log(this.featuredProdList)
 
         // this.featuredProductsCategories = response.data;

        }else{
            
        }
  
      }); 
  }


  getFeaturedProductsImageURL(): string{
    return 
  }
  
  pageAnimation(): void{ 
 
    //this.appAnimations.init();   
    
  }
 

  nextBanner(){

    this.currBannerItem++;  
    
    if(this.currBannerItem > (this.BannerArray.length - 1)){
      this.currBannerItem = 0;
    }

    console.log(this.currBannerItem)

    this.navigateSlide(this.currBannerItem);
       
  }


  prevBanner(){ 
 
    this.currBannerItem--;   

    if(this.currBannerItem < 0){
      this.currBannerItem = (this.BannerArray.length - 1); 
    } 

    this.navigateSlide(this.currBannerItem)

  }

  navigateSlide(i){   
    this.currBannerItem = i;
    TweenMax.to(".banner", 0.5, {autoAlpha:0,scale:1});   
    TweenMax.to(this.BannerArray[i], 0.5, {autoAlpha:1,scale:1}) 
  }


  getElement(elm): any{
     return document.getElementsByClassName(elm);
  }

  pageSEO() : void{
    let seoData = {
      title: 'EasyBuilding.lk | Home',
      keywords: 'Construction Services in Colombo Galle Kalutara Gampaha Srilanka,Vehicle A/C Repairs, Electrician,Plumber Colmbo Srilanka,Tile Services, Construction Deals,Mason baas,House builders Srilanka,ManPower,WorkForce,Construction Services, Construction Rates, BOQ, Quotation Requests, Construction Deals,Easybuilding, Easybuilding.lk, Easybuilding Deals, Own Quotation Requests, House construction, Building construction, Contrcators, inteiror, plumbers, Painters,  architects, structural engineers, civil construction, repair',
      description: 'We are a leading online House and Building construction market place connecting potential house and commercial building construction clients with quality and reliable construction companies, individual contractors, masons, plumbers, electricians, and construction and interior material suppliers.',
      image: ''
    }

    this.seo.setSEOData(seoData)
  }

 

}
