import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserDTO} from "../../models/User.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : string;
  constructor(private httpClient : HttpClient,
              private authService : AuthService){
    this.url = environment.apiUrl + "/user";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUserData().accessToken
    });
  }


  getAllUserEmploye() {
    return this.httpClient.get<Array<UserDTO>>(this.url,{headers: this.getHeader()});
  }

  deleteUserById(id : number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});
  }
}
