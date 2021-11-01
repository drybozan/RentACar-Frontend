import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colour } from '../models/colour/colour';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44307/api/";
  constructor(private httpClient:HttpClient) { }

  getColours():Observable<ListResponseModel<Colour>>{
    let newPath = this.apiUrl + "colours/getall"
    return this.httpClient.get<ListResponseModel<Colour>>(newPath)
      
    }

  getColorById(color_id: number): Observable<ListResponseModel<Colour>> {
      let newPath = this.apiUrl + 'colours/getbyid?id='+color_id;
      return this.httpClient.get<ListResponseModel<Colour>>(newPath);
    }

  add(colour:Colour):Observable<ResponseModel>{
      return this.httpClient.post<ResponseModel>(this.apiUrl + "colours/add",colour)
  }

  delete(colour:Colour):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "colours/delete",colour)
} 
}
