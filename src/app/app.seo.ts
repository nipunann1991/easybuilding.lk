import { Injectable } from '@angular/core';   
import { SeoSocialShareService, JsonLdService } from 'ngx-seo'; 


export interface SeoSocialShareData {
    title?: string;
    keywords?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
    section?: string;
    published?: string;
    modified?: string;
  } 

  @Injectable()
  export class AppSEO {

    constructor(
      private readonly seoSocialShareService: SeoSocialShareService, 
      private readonly jsonLdService: JsonLdService
    ) { }
  
    ngOnInit(): void {
  
      
    } 

    setSEOData(seo_data): void{

        const seoData: SeoSocialShareData = {

            title: seo_data.title,
            keywords: seo_data.keywords,
            description: seo_data.description,
            image: seo_data.image,
            
          };
    
          this.seoSocialShareService.setData(seoData);
    
          const jsonLdObject = this.jsonLdService.getObject('Website', {
            name: '',
            url: '',
          });
          this.jsonLdService.setData(jsonLdObject);

    }
  
  }