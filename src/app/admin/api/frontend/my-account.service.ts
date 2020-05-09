import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  token: any = JSON.parse(localStorage.getItem('token'));

  constructor(private http: HttpClient) { }

  getProfileDetails(){  
     
    return this.http.get(environment.baseUrl+'ProfileController/getProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
 
  getCustomProfileDetails(params){  
    if( this.token == null){
      this.token = JSON.parse(localStorage.getItem('tokenAdmin'));
    }
    return this.http.get(environment.baseUrl+'ProfileController/getCustomProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id+'&client_id='+params.client_id+'&provider_id='+params.provider_id);
  }

  getAccountDetails(){  
     
    return this.http.get(environment.baseUrl+'ProfileController/getAccountDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getContactDetails(){  
     
    return this.http.get(environment.baseUrl+'ProfileController/getContactDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
  
  updateProfileDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/updateProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  uploadCoverImage(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/fileUpload?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, formData , { headers: headers });
  }

  removeFile(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'ProfileController/removeFile?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
}

}
