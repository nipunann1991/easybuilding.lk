import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));;

  constructor(private http: HttpClient) { }
 

  getClientDetailsDT(profile_type){  
    let url = environment.baseUrl+'ClientController/getClientDetailsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id+'&profile_type='+profile_type; 
   	return url;  
  }
 

  getClientProfileDetailsDT(){  
    let url = environment.baseUrl+'ClientController/getClientProfileDetailsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }


  isFeaturedProfile(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/isFeaturedProfile?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  isFeaturedProduct(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/isFeaturedProduct?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  


  updateProfileDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/updateProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  editProductDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
 
    return this.http.post(environment.baseUrl+'ProfileController/editProductDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
 
  }

  getProfileToken(postVals){   
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ClientController/getProfileToken?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);

  }
 
}
