import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  token: any = {};

  constructor(private http: HttpClient) { }

  getProfileDetails(){  
    this.token = JSON.parse(localStorage.getItem('token')); 
    return this.http.get(environment.baseUrl+'ProfileController/getProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getAccountDetails(){  
    this.token = JSON.parse(localStorage.getItem('token')); 
    return this.http.get(environment.baseUrl+'ProfileController/getAccountDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getContactDetails(){  
    this.token = JSON.parse(localStorage.getItem('token')); 
    return this.http.get(environment.baseUrl+'ProfileController/getContactDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
  
  updateProfileDetails(postVals){ 
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/updateProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
}
