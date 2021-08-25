import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));;

  constructor(private http: HttpClient) { }

  getImageDetailsDT(){  
    let url = environment.baseUrl+'ImagesController/getImageDetailsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
 

  getImageCategories(){ 
    return this.http.get(environment.baseUrl+'ImagesController/getImageCategories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }


  saveImageCategories(postVals){   
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ImagesController/saveImageCategories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);

  }
  

  getSingleImageCategory(postVals){   
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ImagesController/getSingleImageCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);

  }

  getServicsforAdmin(){ 
    return this.http.get(environment.baseUrl+'ImagesController/getServicsforAdmin');
  }
  

  uploadProjectImages(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ImagesController/uploadProjectImages?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, formData , { headers: headers });  
  }


}
