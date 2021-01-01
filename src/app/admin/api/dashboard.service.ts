import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));

  constructor(private http: HttpClient) { }
 
  getSummery(){ 
    return this.http.get(environment.baseUrl+'DashboardController/getSummery?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getCompanyVsProfile(){ 
    return this.http.get(environment.baseUrl+'DashboardController/getCompanyVsProfile?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getTotalSignUps(){ 
    return this.http.get(environment.baseUrl+'DashboardController/getTotalSignUps?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

}
