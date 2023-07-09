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
}
