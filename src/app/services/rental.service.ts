import { Rental } from 'src/app/models/rental/rental';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rental/rentalDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44307/api/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDto>>{
    let newPath = this.apiUrl + "rentals/getdetails"
    return this.httpClient.get<ListResponseModel<RentalDto>>(newPath)
      
    }
    
  getRentalsByCarId(car_id:number):Observable<ListResponseModel<Rental>>{
      let newPath = this.apiUrl + "rentals/getbycarid?carId="+car_id
      return this.httpClient.get<ListResponseModel<Rental>>(newPath)
        
   }
  delete(rental:Rental):Observable<ResponseModel>{
      let newPath = this.apiUrl + "rentals/delete"
      return this.httpClient.post<ResponseModel>(newPath,rental)
        
   }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental)
}
}
