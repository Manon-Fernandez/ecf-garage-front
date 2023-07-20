import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Option} from "../../models/Option.model";

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  url : string;

  constructor(private httpClient : HttpClient) {
    this.url = environment.apiUrl + "/option";
  }

  getAllOptionByVoitureId(voitureId : number){
    return this.httpClient.get<Array<Option>>(this.url + '/voiture/' + voitureId);
  }

}
