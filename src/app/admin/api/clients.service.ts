import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));;

  constructor(private http: HttpClient) { }
 

  getClientDetailsDT(){  
    let url = environment.baseUrl+'ClientController/getClientDetailsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
 

  getClientProfileDetailsDT(){  
    let url = environment.baseUrl+'ClientController/getClientProfileDetailsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }


}
