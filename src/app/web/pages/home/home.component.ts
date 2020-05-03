import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppSEO } from "./../../../app.seo"; 
import * as ScrollMagic from "scrollmagic";  
import { TweenMax, TimelineMax  } from "gsap";  
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";  
const gsapStuff = [CSSPlugin];


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

  
  constructor(private seo: AppSEO, ) {  
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
    this.pageSEO();  
  }

  ngOnInit(): void { 
    
    window.scroll(0,0); 
    
    this.featuredProfList = [{
      id: 1,
      title: "Modern Pool #1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool1.png",
    },
    {
      id: 2,
      title: "Modern Pool #2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool2.png",
    },{
      id: 3,
      title: "Modern Pool #3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool3.png",
    },{
      id: 4,
      title: "Modern Pool #4",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool4.png",
    },{
      id: 5,
      title: "Modern Pool #5",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool5.png",
    },
    {
      id: 6,
      title: "Modern Pool #6",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool6.png",
    },{
      id: 7,
      title: "Modern Pool #7",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool7.png",
    },{
      id: 8,
      title: "Modern Pool #8",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto error quod vitae illum magnam aperiam dolor quis.",
      imgUrl: "./assets/images/modern-pool8.png",
    }];


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

    // var controller = new ScrollMagic.Controller();

    //   var scene = new ScrollMagic.Scene({
    //     triggerElement: '.services-area',
    //     triggerHook: .6,
    //     offset: 200
    //   })
    //   .setClassToggle('.header-wrapper', 'fixed-header')  
    //   .addTo(controller);
  
  }

  ngAfterViewInit() {
    this.pageAnimation();
  }


  pageAnimation(): void{ 

    let appAnimations = {
      controller: new ScrollMagic.Controller(),
      

      init: function(){
        appAnimations.parallaxBanner();
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
        let bannerAnimation = new TimelineMax({ delay: 0.4 });

        bannerAnimation
          .from(elm+' h1', 0.4, { opacity: 0})
          .from(elm+' p', 0.4, {y: 10, opacity: 0})
          .from(elm+' .btn ', 0.4, {y: 10, opacity: 0}); 
        
        appAnimations.scrollMagicInit(elm, bannerAnimation );
        
      },

      servicesAnims:  () =>{
        let elm = '.services-list';
        let elm1 = '.services-area';
        let servicesAnims = new TimelineMax();   
        let servicesAnims1 = new TimelineMax();   

        servicesAnims
          .from(elm1+' h2', 0.3, {  opacity: 0, ease: Power1.easeIn })  
          .from(elm1+' p.text-center', 0.3, { opacity: 0, ease: Power1.easeIn });
        
        appAnimations.scrollMagicInit(elm1, servicesAnims, 0);
          
        servicesAnims1  
          .from(elm+' li', 0.3, { autoAlpha: 0, y: 10, stagger: 0.2,  ease: Power1.easeOut } );

        appAnimations.scrollMagicInit(elm1, servicesAnims1, 400);
         
        
      },

      browseAnims:  () =>{

        let elm = '.browse-item';
        let browseAnimations1 = new TimelineMax();  
        let browseAnimations2 = new TimelineMax(); 

        browseAnimations1.from(elm+'.item1', 0.4, { y: 20, opacity: 0, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(elm, browseAnimations1); 

        browseAnimations2.from(elm+'.item2', 0.4, { y: 20, opacity: 0, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(elm, browseAnimations2);
         
      },

      featuredConstructorAnims: ()=>{

        let elm = ".fetured-area";
        let elm1 = ".featured-list";

        let featuredAnim = new TimelineMax(); 
        let featuredAnimBox = new TimelineMax(); 

        featuredAnim.from(elm+' h2', 0.3, { opacity: 0, y: 10, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(elm, featuredAnim);

        featuredAnimBox.from(elm1+' .featured-item-wrapper', 0.3, { autoAlpha: 0, y: 10, stagger: 0.2, ease: Power1.easeOut });
        appAnimations.scrollMagicInit(elm1, featuredAnimBox); 

      },

      featuredProductAnims: ()=>{
        let elm = ".fetured-products-area";
        let elm1 = ".fetured-products-list";

        let featuredAnim = new TimelineMax(); 
        let featuredAnimBox = new TimelineMax(); 

        featuredAnim.from(elm+' h2', 0.3, { opacity: 0, y: 10, ease: Power1.easeIn }) 
        appAnimations.scrollMagicInit(elm, featuredAnim);

        featuredAnimBox.from(elm1+' .fetured-products-item-wrapper', 0.3, { autoAlpha: 0, y: 10, stagger: 0.2, ease: Power1.easeOut });
        appAnimations.scrollMagicInit(elm1, featuredAnimBox); 
      },
      
      scrollMagicInit:  (elm, animation, offset = 200) =>{
        return new ScrollMagic.Scene( { triggerElement: elm, triggerHook: "onEnter", offset: offset} )
          .setTween( animation )
          .addTo(appAnimations.controller);
      }

    }
    

    appAnimations.init();  

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
