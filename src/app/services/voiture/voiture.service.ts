import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Voiture} from "../../models/Voiture.model";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  url : string;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.url = environment.apiUrl + "/voiture"
  }

  getHeader(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getUserData().accessToken
    });
  }

  getAllVoitures() {
    return this.httpClient.get<Array<Voiture>>(this.url);
  }

  createVoiture(voiture : Voiture){

    console.log(this.authService.getUserData().accessToken);
    return this.httpClient.post(this.url,voiture.serialize(), {headers: this.getHeader()});
  }

  getVoitureById(id : number){
    return this.httpClient.get<Voiture>(this.url + '/' + id);
  }

  deleteVoitureById(id : number){
    return this.httpClient.delete(this.url + '/' + id,{headers: this.getHeader()});
  }

  updateVoiture(id: number, event : Voiture) {
    return this.httpClient.put(this.url + '/' + id,event.serialize(),{headers: this.getHeader()});
  }
}
