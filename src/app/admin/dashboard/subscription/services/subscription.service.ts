import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));

  constructor(private http: HttpClient) { }

  getPackagesDT(){  
    let url = environment.baseUrl+'SubscriptionController/getPackagesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }


  getPackage(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SubscriptionController/getPackage?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  addPackages(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SubscriptionController/addPackage?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  editPackages(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SubscriptionController/editPackage?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  deletePackage(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SubscriptionController/deletePackage?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

}
