import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  token: any = {};

  constructor(private http: HttpClient) { }
 

  getClientDetailsDT(){ 
    this.token = JSON.parse(localStorage.getItem('token')); 
    let url = environment.baseUrl+'ClientController/getClientDetailsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
 


}
