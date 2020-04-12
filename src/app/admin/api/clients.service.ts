import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }


  onClientLogin(postVals) : any {  

    const params = new HttpParams({
        fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'ClientController/onClientLogin', params); 
   
  }
 

  checkUserLoginStatus(postVals)  : any {  

    const params = new HttpParams({
        fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'ClientController/checkUserLoginStatus', params); 
   
  }


}
