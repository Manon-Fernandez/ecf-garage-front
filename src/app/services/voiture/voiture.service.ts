import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Voiture} from "../../models/Voiture.model";

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  url : string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = 'http://localhost:8081/api/voiture';
  }


  getAllVoitures() {
    return this.httpClient.get<Array<Voiture>>(this.url);
  }

  createVoiture(voiture : Voiture){
    return this.httpClient.post(this.url,voiture.serialize());
  }

  getVoitureById(id : number){
    return this.httpClient.get<Voiture>(this.url + '/' + id);
  }

  deleteVoitureById(id : number){
    return this.httpClient.delete(this.url + '/' + id);
  }
}
