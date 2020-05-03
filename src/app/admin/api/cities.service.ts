import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  token: any = {};

  constructor(private http: HttpClient) { }

  getCitiesDT(){ 
    this.token = JSON.parse(localStorage.getItem('token')); 
    let url = environment.baseUrl+'CityController/getCitiesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

  getDistricts(){
    this.token = JSON.parse(localStorage.getItem('token')); 
    return this.http.get(environment.baseUrl+'CityController/getDistricts?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }

  getSelectedCity(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/getSelectedCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addCity(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/addCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  editCity(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/editCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  deleteCity(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CityController/deleteCity?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

}
