import { CustomerDetail } from './../models/customer/customerDetail';
import { Customer } from './../models/customer/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44307/api/customers/";
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<CustomerDetail>>{
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(this.apiUrl + 'getdetails' )
  }

  getCustomerDetailsByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let apiUrl = this.apiUrl + "getbyid?id=" + userId
    return this.httpClient.get<SingleResponseModel<Customer>>(apiUrl)
  }

  update(customer:Customer):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(apiUrl , customer)
  }
}
