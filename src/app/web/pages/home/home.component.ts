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
  
  adSlides: any = [];
  bgImagePath = environment.uploadPath + "admin/home-slider/" ;   
  BannerImgs: any = "";
  BannerArray:any = [];
  currBannerItem: number = -1;  
  autoSlide: any;
  
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
    this.getAdSlides()

    this.autoSlide = setInterval(() => {
      this.nextBanner()
    }, 7000);
  }

  ngOnDestroy() {
    if (this.autoSlide) {
      clearInterval(this.autoSlide);
    }
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
          
      }); 


      
  
  }
    
   
  pageAnimation(): void{ 
    
  } 

  nextBanner(){

    this.currBannerItem++;  
    
    if(this.currBannerItem > (this.BannerArray.length - 1)){
      this.currBannerItem = 0;
    } 

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
