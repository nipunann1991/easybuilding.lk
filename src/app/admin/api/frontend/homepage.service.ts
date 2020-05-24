import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  getCompanyData(){   
    return this.http.get(environment.baseUrl+'HomeController/getCompanyData');
  }

}
