import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car/car';
import { CarImage } from '../models/carImage/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private httpClient:HttpClient) { }

  apiURL = "https://localhost:44307/api/"

  getCarDetailsByCarId(car_id : number):Observable<ListResponseModel<Car>>{
    let newURL = this.apiURL+"cars/getcardetailsbycarid?carId="+car_id;
    return this.httpClient.get<ListResponseModel<Car>>(newURL);
  }


  getCarImagesByCarId(car_id : number):Observable<ListResponseModel<CarImage>>{
    let newURL = this.apiURL+"carimages/getbycarid?carId="+car_id
    return this.httpClient.get<ListResponseModel<CarImage>>(newURL);
  }
}
