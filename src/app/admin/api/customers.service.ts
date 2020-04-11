import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment"


interface DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
	persons: any;
  constructor(private http: HttpClient) { }


  getCustomers() : any {  
    let url = environment.baseUrl+'CustomersController/getSingleCustomer'; 
   	return url; 
  }
 
  addNewCustomer(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'CustomersController/addCustomer', params);
  }
 
  getCustomerDetails(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'CustomersController/getCustomerDetails', params);
  }

  getNextTableID(){
    	return this.http.get(environment.baseUrl+'CustomersController/getNextTableID');
  }

  updateNewCustomer(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'CustomersController/updateCustomerDetails', params);
  }

  deleteCustomer(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'CustomersController/deleteCustomer', params);
  }




 
   
}
