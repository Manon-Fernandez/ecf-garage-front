import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Voiture} from "../../models/Voiture.model";
import {Horaire} from "../../models/Horaire.model";

@Injectable({
  providedIn: 'root'
})
export class HoraireService {

  url : string;
  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:8081/api/horaire';
  }

  getAllHoraires() {
    return this.httpClient.get<Array<Horaire>>(this.url);
  }
}
