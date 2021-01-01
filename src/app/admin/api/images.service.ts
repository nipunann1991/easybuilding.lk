import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));;

  constructor(private http: HttpClient) { }

  getImageDetailsDT(){  
    let url = environment.baseUrl+'ImagesController/getImageDetailsDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

}
