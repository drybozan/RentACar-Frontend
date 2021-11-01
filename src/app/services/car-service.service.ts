import { Car } from './../models/car/car';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44307/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getdetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
      
    }
  getCars2():Observable<ListResponseModel<Car>>{
      let newPath=this.apiUrl+"cars/getall"
      return this.httpClient.get<ListResponseModel<Car>>(newPath)
        
     }
  getCarById(car_id:number):Observable<ListResponseModel<Car>>{
      let newPath=this.apiUrl+"cars/getbyid?id="+car_id
      return this.httpClient.get<ListResponseModel<Car>>(newPath)
        
  }

  getCarsByBrand(brand_id:number):Observable<ListResponseModel<Car>>{
      let newPath=this.apiUrl+"cars/getcarsbybrandid?id="+brand_id
        return this.httpClient.get<ListResponseModel<Car>>(newPath)
          
        }

  getCarsByColor(color_id:number):Observable<ListResponseModel<Car>>{
      let newPath=this.apiUrl+"cars/getcarsbycolorid?id="+color_id
        return this.httpClient.get<ListResponseModel<Car>>(newPath)
              
        }

  getCarsByBrandsAndColours(brand_id:number,color_id : number):Observable<ListResponseModel<Car>>{
          let newURL = this.apiUrl+"cars/getcarsbybrandsandcolours?brandid="+brand_id+"&colourId="+color_id
          return this.httpClient.get<ListResponseModel<Car>>(newURL);
        }
 
  add(car:Car):Observable<ResponseModel>{
          return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/add",car)
      }

  delete(car:Car):Observable<ResponseModel>{
        return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/delete",car)
    }
    
  update(car:Car):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl + "cars/update",car)
  }


}
