import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSEO } from "./../../../app.seo"; 
import { HomepageService } from "../../../admin/api/frontend/homepage.service";
import { environment } from "../../../../environments/environment";
import { gsap,TweenMax, TimelineMax } from "gsap";  
import * as ScrollMagic from "scrollmagic"; 
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";  
import { ScrollScene, ScrollObserver  } from 'scrollscene'
//const gsapStuff = [CSSPlugin];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
})
export class HomeComponent implements OnInit {
  
  featuredProfList: any = [];
  featuredProdList: any = [];

  
  BannerImgs: any = this.getElement('banner') 
  BannerArray:any = [];
  currBannerItem: number = -1;

  
  constructor(private seo: AppSEO, private homePage: HomepageService) {    
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax); 
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


    this.BannerArray = [].slice.call(this.BannerImgs); 

    this.getConstructorList();
  
  }

  ngAfterViewInit() {
    this.pageAnimation(); 
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
    

  pageAnimation(): void{ 

    let appAnimations = {
      controller: new ScrollMagic.Controller(),
      

      init: function(){
        //appAnimations.parallaxBanner();
        appAnimations.bannerAnims();
        appAnimations.servicesAnims();
        appAnimations.browseAnims();
        appAnimations.featuredConstructorAnims();
        appAnimations.featuredProductAnims();
      },

      parallaxBanner: () =>{
        let elm = '.banner-area .bg';
        let parallax = TweenMax.fromTo( elm, 1, {  backgroundPosition: '50% 100px' }, {  backgroundPosition: ' 50% 70%',   ease: Linear.easeNone  } );
       
        new ScrollMagic.Scene({
          triggerElement: elm, 
          triggerHook: 1,
          duration: '200%',
        }).setTween( parallax ).addTo(appAnimations.controller);
      },

      bannerAnims:  () =>{ 
        let elm = '.banner-area'; 
        const domNode = document.querySelector(elm) 
        const bannerAnimation = gsap.timeline({ paused: true });

        bannerAnimation
          .from(elm+' h1', 0.4, { opacity: 0, ease: Power1.easeIn})
          .from(elm+' p', 0.4, {y: 10, opacity: 0, ease: Power1.easeIn})
          .from(elm+' .btn ', 0.4, {y: 10, opacity: 0, ease: Power1.easeIn}); 
 
        
        appAnimations.scrollMagicInit(domNode, bannerAnimation, 0 );
        
      },

      servicesAnims:  () =>{
        let elm = '.services-list';
        let elm1 = '.services-area';  
        const dom_elm = document.querySelector(elm); 
        const dom_elm1 = document.querySelector(elm1); 

        const servicesAnims = gsap.timeline({ paused: true });
        const servicesAnims1 = gsap.timeline({ paused: true });
        
        servicesAnims
          .from(elm1+' h2', 0.3, {  opacity: 0, ease: Power1.easeIn })
          .from(elm1+' p.text-center', 0.3, { opacity: 0, ease: Power1.easeIn }); 

        appAnimations.scrollMagicInit(dom_elm, servicesAnims, 0);

        servicesAnims1.from(elm+' li', 0.3, { autoAlpha: 0, y: 10, stagger: 0.2,  ease: Power1.easeOut } ); 
        appAnimations.scrollMagicInit(dom_elm1, servicesAnims1, 400);
         
        
      },

      browseAnims:  () =>{

        let elm = '.browse-item';
        const dom_elm = document.querySelector(elm); 
 
        const browseAnimations1 = gsap.timeline({ paused: true });
        const browseAnimations2 = gsap.timeline({ paused: true });

        browseAnimations1.from(elm+'.item1', 0.4, { y: 20, opacity: 0, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(dom_elm, browseAnimations1, 200); 

        browseAnimations2.from(elm+'.item2', 0.4, { y: 20, opacity: 0, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(dom_elm, browseAnimations2, 200);
         
      },

      featuredConstructorAnims: ()=>{

        let elm = ".fetured-area";
        let elm1 = ".featured-list";

        const dom_elm = document.querySelector(elm); 
        const dom_elm1 = document.querySelector(elm1);  
        const featuredAnim = gsap.timeline({ paused: true });
        const featuredAnimBox = gsap.timeline({ paused: true });

        featuredAnim.from(elm+' h2', 0.3, { opacity: 0, y: 10, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(dom_elm, featuredAnim);

        featuredAnimBox.from(elm1+' .featured-item-wrapper', 0.3, { autoAlpha: 0, y: 10, stagger: 0.2, ease: Power1.easeOut });
        appAnimations.scrollMagicInit(dom_elm1, featuredAnimBox); 

      },

      featuredProductAnims: ()=>{
        let elm = ".fetured-products-area";
        let elm1 = ".fetured-products-list";

        const dom_elm = document.querySelector(elm); 
        const dom_elm1 = document.querySelector(elm1);  
        const featuredAnim = gsap.timeline({ repeat: 0, paused: true });
        const featuredAnimBox = gsap.timeline({ paused: true }); 

        featuredAnim.from(elm+' h2', 0.3, { opacity: 0, y: 10, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(dom_elm, featuredAnim);

        featuredAnimBox.from(elm1+' .fetured-products-item-wrapper', 0.3, { autoAlpha: 0, y: 10, stagger: 0.2, ease: Power1.easeOut });
        appAnimations.scrollMagicInit(dom_elm1, featuredAnimBox); 
      },
      
      scrollMagicInit:  (domNode, tl, offset = 200) =>{ 

        return  new ScrollObserver({ 
          triggerElement: domNode, 
          gsap: {
            timeline: tl, 
          }, 
          useDuration: false,
          offset: offset,  
        }) 
      }

    }
    

    //appAnimations.init();  

    this.nextBanner(); 
    
  }
 

  nextBanner(){

    this.currBannerItem++;  
     
    if(this.currBannerItem == 0 ){ 
      TweenMax.to(this.BannerArray[this.currBannerItem], 0.5, {autoAlpha:1,scale:1}); 

    }else if(this.currBannerItem > 0 && this.currBannerItem !== (this.BannerArray.length)){ 

      TweenMax.to(this.BannerArray[this.currBannerItem - 1], 0.5, {autoAlpha:0,scale:1});   
      TweenMax.to(this.BannerArray[this.currBannerItem], 0.5, {autoAlpha:1, scale:1}); 

    }else{
        
      TweenMax.to(this.BannerArray[this.currBannerItem - 1], 0.5, {autoAlpha:0,scale:1}); 
      TweenMax.to(this.BannerArray[0], 0.5, {autoAlpha:1, scale:1});  
      this.currBannerItem = -1;
    }
    
    
  }


  prevBanner(){ 
 
    this.currBannerItem--;   
     
    if(this.currBannerItem >= 0 ){ 

      TweenMax.to(this.BannerArray[this.currBannerItem+1], 0.5, {autoAlpha:0,scale:1});   
      TweenMax.to(this.BannerArray[this.currBannerItem], 0.5, {autoAlpha:1, scale:1}); 

    }else{

      this.currBannerItem = ( this.BannerArray.length  - 1 ); 
      TweenMax.to(this.BannerArray[0], 0.5, {autoAlpha:0,scale:1}); 
      TweenMax.to(this.BannerArray[(this.currBannerItem)], 0.5, {autoAlpha:1, scale:1});   

    }

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

}
