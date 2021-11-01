import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44307/api/";
  constructor(private httpClient:HttpClient) { }

  addPayments(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + "payments/add"
    return this.httpClient.post<ResponseModel>(newPath,payment)
      
    }
}
