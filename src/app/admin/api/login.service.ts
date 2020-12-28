import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onClientLogin(postVals) : any {  

    const params = new HttpParams({
        fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'LoginController/onClientLogin', params); 
   
  }
 
  
  onClientLoginAdmin(postVals) : any {  

    const params = new HttpParams({
        fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'LoginController/onClientLoginAdmin', params); 
   
  }

  

  onEBUserLogin(postVals) : any {  

    const params = new HttpParams({
        fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'LoginController/onEBUserLogin', params); 
   
  }
  

  onAdminLogin(postVals) : any {  

    const params = new HttpParams({
        fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'LoginController/onAdminLogin', params); 
   
  }

  checkUserLoginStatus(postVals)  : any {  

    const params = new HttpParams({
        fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'LoginController/checkUserLoginStatus', params); 
   
  }

  
}
