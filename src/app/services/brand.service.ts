import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44307/api/";
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
      
    }

  getBrandById(brand_id: number): Observable<ListResponseModel<Brand>> {
      let newPath = this.apiUrl + 'brands/getbyid?id='+brand_id;
      return this.httpClient.get<ListResponseModel<Brand>>(newPath);
    }

  add(brand:Brand):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/add",brand)
  }  

  delete(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/delete",brand)
}

 update(brand:Brand):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl + "brands/update",brand)
}  
}
