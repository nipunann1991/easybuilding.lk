import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }
  
  getConstructors(){   
    return this.http.get(environment.baseUrl+'HomeController/getConstructors');
  }

  getProductsMenuItems(){   
    return this.http.get(environment.baseUrl+'HomeController/getProductsMenuItems');
  }

  getServicesMenuItems(){   
    return this.http.get(environment.baseUrl+'HomeController/getServicesMenuItems');
  }

  getPhotosMenuItems(){   
    return this.http.get(environment.baseUrl+'HomeController/getPhotosMenuItems');
  } 
  
  getAdSlides(){   
    return this.http.get(environment.baseUrl+'HomeController/getAdSlides');
  } 
  
  getFeaturedProductsCategories(){   
    return this.http.get(environment.baseUrl+'HomeController/getFeaturedProductsCategories');
  }

  getFeaturedProducts(){   
    return this.http.get(environment.baseUrl+'HomeController/getFeaturedProducts');
  }

  


  

}
