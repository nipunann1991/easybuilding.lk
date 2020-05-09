import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));

  constructor(private http: HttpClient) { }

  getCompanyDetails(){  
    return this.http.get(environment.baseUrl+'SettingsController/getCompanyDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getAdminUsersDT(){  
     
    let url = environment.baseUrl+'SettingsController/getAdminUsersDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
     return url;   
  }
   
  getUserRole(){   
    return this.http.get(environment.baseUrl+'SettingsController/getUserRole?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
 
  addAdminUser(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SettingsController/addAdminUser?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  getSingleAdminUser(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SettingsController/getSingleAdminUser?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  editAdminUser(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SettingsController/editAdminUser?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  

  addCompanyDetails(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SettingsController/addCompanyDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  editCompanyDetails(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SettingsController/editCompanyDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  deleteUser(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SettingsController/deleteUser?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  
}
