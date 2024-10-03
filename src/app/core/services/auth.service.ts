import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, LoginPayload, RegisterPayload, User} from '../model/common.model';
import { ApiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) {
    
   }

  register(payload: RegisterPayload){
    return this._http.post<ApiResponse<User>>(
      `${ApiEndpoint.Auth.register}`, 
      payload
    );
  }

  login(payload: LoginPayload){
    return this._http.post<ApiResponse<User>>(
      `${ApiEndpoint.Auth.login}`, 
      payload
    );
    
  }

  me(){
    return this._http.get<ApiResponse<User>>(
      `${ApiEndpoint.Auth.me}`, 
    );

  }
}
