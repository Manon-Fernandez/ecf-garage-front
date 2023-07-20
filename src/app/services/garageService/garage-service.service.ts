import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Service} from "../../models/Service.model";
import {environment} from "../../../environments/environment.development";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GarageServiceService {

  url : string;

  constructor(private httpClient : HttpClient,
              private authService: AuthService){
    this.url = environment.apiUrl + "/service";
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUserData().accessToken
    });
  }

  getAllServices(){
    return this.httpClient.get<Array<Service>>(this.url);
  }

  updateService(id: number, unService: Service) {
    return this.httpClient.put(this.url + '/' + id, unService.serialize(), {headers: this.getHeader()});
  }

  createService(unService: Service) {
    return this.httpClient.post(this.url,unService.serialize(), {headers: this.getHeader()});
  }

  deleteServiceById(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {headers: this.getHeader()});

  }
}
