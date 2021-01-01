import { Component, OnInit, ViewEncapsulation, ViewChild, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { AppSEO } from "./../../../app.seo"; 
import { HomepageService } from "../../../admin/api/frontend/homepage.service";
import { environment } from "../../../../environments/environment";
import { gsap, TweenMax,  TimelineMax } from "gsap";   
import { ScrollTrigger } from "gsap/ScrollTrigger";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
})
export class HomeComponent implements OnInit {
  
  @ViewChildren('banner') banner:QueryList<Element>;
  featuredProfList: any = [];
  featuredProdList: any = [];
  adSlides: any = [];
  bgImagePath = environment.uploadPath+"admin/home-slider/" ;  
  BannerImgs: any = "";
  BannerArray:any = [];
  currBannerItem: number = -1; 
  
  constructor(private seo: AppSEO, private homePage: HomepageService) {    
    gsap.registerPlugin(ScrollTrigger); 
    this.pageSEO();  
  }
 
  ngOnInit(): void { 
    
    window.scroll(0,0); 
      

    this.featuredProdList = [{
      id: 1,
      title: "Modern Pool #1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/products1.png",
    },
    {
      id: 2,
      title: "Modern Pool #2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/products2.png",
    },{
      id: 3,
      title: "Modern Pool #3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/products3.png",
    },{
      id: 4,
      title: "Modern Pool #4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/products4.png",
    },{
      id: 5,
      title: "Modern Pool #5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/products5.png",
    },
    {
      id: 6,
      title: "Modern Pool #6",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/products6.png",
    },{
      id: 7,
      title: "Modern Pool #7",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/products7.png",
    }]


    this.getConstructorList();
    this.getAdSlides(); 
    
  
  }

  ngAfterViewInit() {
    //this.pageAnimation();   
    
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

        

            this.appAnimations.staggerIcons(".featured-item-wrapper", ".featured-item-wrapper");
          
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
    

  
  pageAnimation(): void{ 
 
    this.appAnimations.init();   
    
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
      title: 'EasyBuilding.lk | Home Page',
      keywords: 'Construction Services in Colombo Galle Kalutara Gampaha Srilanka,Vehicle A/C Repairs, Electrician,Plumber Colmbo Srilanka,Tile Services, Construction Deals,Mason baas,House builders Srilanka,ManPower,WorkForce,Construction Services, Construction Rates, BOQ, Quotation Requests, Construction Deals,Easybuilding, Easybuilding.lk, Easybuilding Deals, Own Quotation Requests, House construction, Building construction, Contrcators, inteiror, plumbers, Painters,  architects, structural engineers, civil construction, repair',
      description: 'We are a leading online House and Building construction market place connecting potential house and commercial building construction clients with quality and reliable construction companies, individual contractors, masons, plumbers, electricians, and construction and interior material suppliers.',
      image: ''
    }

    this.seo.setSEOData(seoData)
  }

  appAnimations = { 

    init: function(){ 
      this.fadeInQuick(".services-area h2.text-center");
      this.fadeInQuick(".services-area p.text-center");
      this.animLeft(".browse-wrapper.anim-left");
      this.animRight(".browse-wrapper.anim-right");
      this.staggerIcons(".services-list li", ".services-area");
      // this.fadeUp(".fetured-area", ".fetured-area"); 
    },

    animLeft: (elm) => {

      var imageBlocks = gsap.timeline({
        scrollTrigger: {
          trigger: elm,
          start: "-50% center",  
        }
      });

      imageBlocks.fromTo( elm , 0.4, { opacity: 0, x: -20, ease: Power0.easeOut }, { opacity: 1, x: 0, ease: Power0.easeOut } );
   
    },

    animRight: (elm) => {

      var imageBlocks = gsap.timeline({
        scrollTrigger: {
          trigger: elm,
          start: "-50% center",  
        }
      });

      imageBlocks.fromTo( elm , 0.4, { opacity: 0, x: 20, ease: Power0.easeOut }, { opacity: 1, x: 0, ease: Power0.easeOut } );
   
    },

    fadeUpQuick: (elm) => { 
      gsap.fromTo( elm , 1, { opacity: 0, y: 50, ease: Power0.easeOut }, { opacity: 1, y: 0, ease: Power0.easeOut } );
    },

    fadeInQuick: (elm) => { 
      gsap.fromTo( elm , 1, { opacity: 0, ease: Power0.easeOut }, { opacity: 1, ease: Power0.easeOut } );
   
    }, 

    fadeUp: (elm, triggerElm) => {

      var imageBlocks = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElm,
          start: "-50% center",  
        }
      });

      imageBlocks.fromTo( elm , 0.4, { opacity: 0, y: -120, ease: Power0.easeOut }, { opacity: 1, y: 0, ease: Power0.easeOut } );
   
    },

    staggerIcons: (elm, triggerElm)=>{ 
      
      var t1 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElm,
          start: "0% center",  
        }
      });

      t1.fromTo(elm, 0.3, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1,  stagger: 0.4, duration: 1, ease:Power0.easeIn});
       
    }, 

  }

}
