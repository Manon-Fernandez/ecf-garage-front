import { Injectable } from '@angular/core';
import {User, UserAuthenticate, UserCreate} from "../../models/User.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {ToastService, ToastType} from "../toast/toast.service";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url : string;
  constructor(private httpClient : HttpClient,
              private toastService : ToastService) {
    this.url = environment.apiUrl + "/auth";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getUserData().accessToken
    });
  }

  public authenticate(user : UserAuthenticate) {
    return this.httpClient.post(this.url +'/signin', user.serialize());
  }

  public setUser(user : User) {
    localStorage.setItem('user', JSON.stringify(user.serialize()));
  }

  public register(user : UserCreate) {
    return this.httpClient.post(this.url +'/signup', user.serialize(),{headers: this.getHeader()});
  }

  public getUserData(): User {
    const userData = localStorage.getItem('user');
    const parsedData = userData ? JSON.parse(userData) : Object.create(null);
    return new User(parsedData);
  }

  public isAuthenticated(): boolean {
    const user = this.getUserData();
    return user != null && user.accessToken != null;
  }

  isAdmin() {
    return this.getUserData().roles.includes('ADMIN');
  }

  isEmploye() {
    return this.getUserData().roles.includes('EMPLOYE');
  }

  logout() {
    localStorage.removeItem('user');
  }

  changePassword(userCreate1: UserCreate) {
    return this.httpClient.put(this.url + '/changePassword', userCreate1.serialize(), {headers: this.getHeader()});

  }
}
