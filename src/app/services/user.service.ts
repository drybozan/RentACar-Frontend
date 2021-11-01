import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { OperationClaim } from '../models/user/operationClaim';
import { User } from '../models/user/User';
import { UserDetail } from '../models/user/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44307/api/'

  constructor(private httpClient:HttpClient) { }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let apiUrl = this.apiUrl + "users/getbyid?id=" + userId
    return this.httpClient.get<SingleResponseModel<User>>(apiUrl)
  }

   getClaimsByUserId(userId:number):Observable<ListResponseModel<OperationClaim>>{
   let apiUrl = this.apiUrl + "users/getclaimsbyuserid?userId=" + userId
  return this.httpClient.get<ListResponseModel<OperationClaim>>(apiUrl)
  }

  getUserDetailsByEmail(email:string):Observable<SingleResponseModel<UserDetail>>{
    let apiUrl = this.apiUrl + "users/getuserdetailsbyemail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserDetail>>(apiUrl)
  }

   update(userForUpdate:UserDetail):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "users/update"
    return this.httpClient.post<ResponseModel>(apiUrl , userForUpdate)
   }
}
