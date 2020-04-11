import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "./../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  constructor(private http: HttpClient) { }
 
  getNewOrders(): any { 
   	return	this.http.get(environment.baseUrl+'KitchenController/getNewOrders');
  }

  getpendingOrders(): any { 
   	return	this.http.get(environment.baseUrl+'KitchenController/getpendingOrders');
  }

  getCompletedOrders(): any { 
   	return	this.http.get(environment.baseUrl+'KitchenController/getCompletedOrders');
  }

  updateOrderStatus(postVals){

  	const params = new HttpParams({
   		fromObject : postVals
   	});

    return this.http.post(environment.baseUrl+'KitchenController/updateOrderStatus', params);
  }

}
