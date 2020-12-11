import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getSelectedProduct(postVals){  
    
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'SearchController/getSelectedProduct', params); 
  }
}