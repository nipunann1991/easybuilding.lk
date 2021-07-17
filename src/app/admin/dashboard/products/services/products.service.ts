import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));

  constructor(private http: HttpClient) { }

  getProductsDT(){ 
     
    let url = environment.baseUrl+'ProductController/getProductsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

}
