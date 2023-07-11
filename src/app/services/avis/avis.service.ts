import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Avis, Status} from "../../models/Avis.model";

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  url : string;
  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:8081/api/avis';
  }

  getAllAvis() {
    return this.httpClient.get<Array<Avis>>(this.url);
  }

  getAllAvisByStatus(status : Status){
    return this.httpClient.get<Array<Avis>>(this.url + '/status/' + Status[status]);
  }

  createAvis(unAvis : Avis){
    return this.httpClient.post(this.url, unAvis);
  }

  updateAvisByStatus(unAvis : Avis, status : Status){
    return this.httpClient.put(this.url +'/status/' + Status[status], unAvis);
  }
}
