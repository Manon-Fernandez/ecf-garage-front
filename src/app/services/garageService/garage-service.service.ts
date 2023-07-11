import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Service} from "../../models/Service.model";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class GarageServiceService {

  url : string;

  constructor(private httpClient : HttpClient) {
    this.url = environment.apiUrl + "/service";
  }

  getAllServices(){
    return this.httpClient.get<Array<Service>>(this.url);
  }
}
