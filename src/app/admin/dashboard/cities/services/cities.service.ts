import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));

  constructor(private http: HttpClient) { }

  getCitiesDT(){ 
     
    let url = environment.baseUrl+'CityController/getCitiesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

  getDistricts(){
     
    return this.http.get(environment.baseUrl+'CityController/getDistricts?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getSelectedCity(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/getSelectedCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addCity(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/addCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  editCity(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/editCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  deleteCity(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/deleteCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

}
